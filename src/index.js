import { TerminalUI } from "./TerminalUI";
import { io } from "socket.io-client";

// local server
// const serverAddress = "http://localhost:3000";
const serverAddress = "https://zombie-castle-rush-server.herokuapp.com/";
const container = document.getElementById("terminal-container");
const button = document.getElementById("play");
container.style.display = "none";

function connectToSocket(serverAddress) {
  return new Promise(res => {
    const socket = io(serverAddress);
    res(socket);
  });
}

function startTerminal(container, socket) {
  const terminal = new TerminalUI(socket);
  terminal.attachTo(container);
  terminal.startListening();
  return terminal;
}

function handleClick() {
  container.style.display = "block";
}

function start() {
  connectToSocket(serverAddress).then(socket => {
    const terminal = startTerminal(container, socket);
    terminal.sendInput("sh run.sh\n");
  });
}

// Better to start on DOMContentLoaded. So, we know terminal-container is loaded
button.addEventListener("click", handleClick);
start();
