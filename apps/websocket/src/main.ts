import { json } from "node:stream/consumers";
import WebSocket from "ws";

const socket = new WebSocket("ws://localhost:3001");

socket.on("open", () => {

  setInterval(()=>{
    socket.send(JSON.stringify({ json: true }));
  },1000)

  
});

socket.on("message", (data) => {
  console.log("Message from server:", data.toString());
});

socket.on("close", () => {
  console.log("Connection closed");
});

socket.on("error", (err) => {
  console.error("WebSocket error:", err);
});
