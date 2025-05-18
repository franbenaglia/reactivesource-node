const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.emit('myEvent', "Event occurred");