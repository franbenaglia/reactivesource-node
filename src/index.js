//ws client
const WebSocket = require('ws');
//const { numberGenerator } = require('./generator-source');

const socket = new WebSocket("ws://localhost:8080/climateData");

function* numberGenerator() {
  let i = 1;
  while (true) {
      yield i++;
      if (i > 10) {
          i = 1;
      }
  }
}


socket.onopen = function (e) {
  console.log("[open] Conexión establecida");
  console.log("Enviando al servidor");
  const generator = numberGenerator();
  const intervalId = setInterval(() => {
    const result = generator.next();
    if (!result.done) { 
      ////console.log(result.value);
      socket.send('{"respons":"' + result.value + '"}');
    } else {
      clearInterval(intervalId);
      console.log("Generator is done.");
    }
  }, 1000);
  socket.send('{"responsews":"Client kkk"}');
};

socket.onmessage = function (event) {
  console.log(`[message] Datos recibidos del servidor: ${event.data}`);
};

socket.onclose = function (event) {
  if (event.wasClean) {
    console.log(`[close] Conexión cerrada limpiamente, código=${event.code} motivo=${event.reason}`);
  } else {
    // ej. El proceso del servidor se detuvo o la red está caída
    // event.code es usualmente 1006 en este caso
    console.log('[close] La conexión se cayó');
  }
};

socket.onerror = function (error) {
  console.log(`[error]`);
};


