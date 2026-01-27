import { WebSocketServer } from "ws";
import { GameManager } from "./game-state.js";
import type { ClientMessage } from "../src/types/quiz.js";

const PORT = 3001;
const wss = new WebSocketServer({ port: PORT });
const game = new GameManager();

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

  ws.on("close", () => {
    game.removeClient(client);
  });
});

console.log(`Quiz WebSocket server running on ws://localhost:${PORT}`);
