import { randomBytes } from "node:crypto";
import { WebSocketServer } from "ws";

// Сервер слушает порт 3001
const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  // При получении сообщения от клиента
  ws.on("message", (message) => {
    console.log("Received:", message.toString());

    // Можно отправить ответ клиенту
    setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 1200);

      ws.send(
        `Server received: ${message.toString()} + random: ${randomNumber}`
      );
    }, 3000);
  });

  // При закрытии соединения
  ws.on("close", () => {
    console.log("Client disconnected");
  });

  // Отправляем сообщение клиенту сразу после подключения
  ws.send("Welcome to the WebSocket server!");
});

console.log("WebSocket server is running on ws://localhost:3001");
