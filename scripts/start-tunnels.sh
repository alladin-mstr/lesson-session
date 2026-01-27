#!/bin/bash
# Start ngrok tunnels for both Vite (5173) and WebSocket server (3001)
# Writes the public URLs to public/ngrok-config.json so the app can read them

CONFIG_FILE="public/ngrok-config.json"

echo "Starting ngrok tunnels..."

# Start ngrok for Vite frontend
ngrok http 5173 --log=stdout --log-format=json > /tmp/ngrok-vite.log 2>&1 &
NGROK_VITE_PID=$!

# Start ngrok for WebSocket server
ngrok http 3001 --log=stdout --log-format=json > /tmp/ngrok-ws.log 2>&1 &
NGROK_WS_PID=$!

# Wait for tunnels to initialize
sleep 3

# Fetch the public URLs from ngrok API
VITE_URL=$(curl -s http://127.0.0.1:4040/api/tunnels | grep -o '"public_url":"https://[^"]*' | head -1 | cut -d'"' -f4)
WS_URL=$(curl -s http://127.0.0.1:4040/api/tunnels | grep -o '"public_url":"https://[^"]*' | tail -1 | cut -d'"' -f4)

# If the above doesn't distinguish well, try by port
if [ -z "$VITE_URL" ] || [ -z "$WS_URL" ]; then
  echo "Trying to fetch URLs by inspecting all tunnels..."
  ALL_TUNNELS=$(curl -s http://127.0.0.1:4040/api/tunnels)

  VITE_URL=$(echo "$ALL_TUNNELS" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for t in data.get('tunnels', []):
    if ':5173' in t.get('config', {}).get('addr', '') and t.get('public_url', '').startswith('https'):
        print(t['public_url'])
        break
" 2>/dev/null)

  WS_URL=$(echo "$ALL_TUNNELS" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for t in data.get('tunnels', []):
    if ':3001' in t.get('config', {}).get('addr', '') and t.get('public_url', '').startswith('https'):
        print(t['public_url'])
        break
" 2>/dev/null)
fi

if [ -z "$VITE_URL" ] || [ -z "$WS_URL" ]; then
  echo "ERROR: Could not detect ngrok tunnel URLs."
  echo "Make sure ngrok is authenticated: ngrok config add-authtoken <token>"
  echo "Check http://127.0.0.1:4040 for tunnel status"
  kill $NGROK_VITE_PID $NGROK_WS_PID 2>/dev/null
  exit 1
fi

# Convert https:// to wss:// for WebSocket
WS_PUBLIC="${WS_URL/https:\/\//wss:\/\/}"

# Write config
cat > "$CONFIG_FILE" << EOF
{
  "appUrl": "${VITE_URL}",
  "wsUrl": "${WS_PUBLIC}"
}
EOF

echo ""
echo "========================================"
echo "  Tunnels ready!"
echo "========================================"
echo "  Frontend: ${VITE_URL}"
echo "  WebSocket: ${WS_PUBLIC}"
echo "  Quiz join: ${VITE_URL}/#/quiz/play"
echo "  Config written to: ${CONFIG_FILE}"
echo "========================================"
echo ""
echo "Press Ctrl+C to stop tunnels"

# Cleanup on exit
trap "kill $NGROK_VITE_PID $NGROK_WS_PID 2>/dev/null; rm -f $CONFIG_FILE; echo 'Tunnels stopped.'" EXIT

# Keep script alive
wait
