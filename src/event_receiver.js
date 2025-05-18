const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('myEvent', (msg) => {
    setImmediate( () => {
        console.log("Message from async: " + msg);
    });
});

const fun = (msg) => {
    console.log("Message from fun: " + msg);
};

eventEmitter.on('myEvent', fun);