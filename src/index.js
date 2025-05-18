//ws client
const WebSocket = require('ws');
const { climateGenerator } = require('./generator-source');

const socket = new WebSocket("ws://localhost:8080/climateData");

socket.onopen = function (e) {
  console.log("[open] Conexión establecida");
  console.log("Enviando al servidor");
};

socket.onmessage = function (event) {
  console.log(`[message] Datos recibidos del servidor: ${event.data}`);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    console.log(`[close] Conexión cerrada limpiamente, código=${event.code} motivo=${event.reason}`);
  } else {
    console.log('[close] La conexión se cayó');
  }
};

socket.onerror = function (error) {
  console.log(`[error]`);
};

async function main() {
  for await (const value of climateGenerator()) {
    socket.send(JSON.stringify(value));
  }
}

main().catch((e) => console.error(e));
