import { randomBytes } from "node:crypto";
import WebSocket, { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 3001 });
wss.on("connection", (ws) => {
    console.log("Client connected");
    ws.on("message", (message) => {
        const msgString = message.toString();
        console.log("Received:", msgString);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });
    ws.on("close", () => {
        console.log("Client disconnected");
    });
    ws.send("Welcome to the WebSocket server!");
});
console.log("WebSocket server is running on ws://localhost:3001");
//# sourceMappingURL=server.js.map