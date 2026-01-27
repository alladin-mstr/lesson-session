import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, resolve, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { WebSocketServer } from "ws";
import { GameManager } from "./game-state.js";
import type { ClientMessage } from "../src/types/quiz.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const PORT = Number(process.env.PORT) || 3000;
const game = new GameManager();

const MIME: Record<string, string> = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
  let pathname = url.pathname === "/" ? "/index.html" : url.pathname;
  if (pathname.includes("..")) pathname = "/index.html";
  const filePath = resolve(join(DIST, pathname));
  if (!filePath.startsWith(DIST)) {
    res.writeHead(403).end();
    return;
  }
  try {
    const data = await readFile(filePath);
    const contentType = MIME[extname(pathname)] ?? "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType }).end(data);
  } catch {
    try {
      const html = await readFile(join(DIST, "index.html"));
      res.writeHead(200, { "Content-Type": "text/html" }).end(html);
    } catch {
      res.writeHead(404).end();
    }
  }
});

const wss = new WebSocketServer({ server, path: "/ws" });
wss.on("connection", (ws) => {
  const client = game.addClient(ws);
  ws.on("message", (raw) => {
    try {
      const msg: ClientMessage = JSON.parse(raw.toString());
      game.handleMessage(client, msg);
    } catch {
      // ignore malformed messages
    }
  });
  ws.on("close", () => game.removeClient(client));
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} (static + /ws)`);
});
