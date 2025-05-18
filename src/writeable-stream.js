//https://www.dennisokeeffe.com/blog/2024-07-10-writable-streams-in-nodejs

const { Writable, Readable } = require("stream");

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const slowWriter = Writable({
    objectMode: true,
    highWaterMark: 2,
    write(chunk, encoding, callback) {
        console.log("Writing:", chunk);
        sleep(1000).then(() => {
            console.log("Finished writing:", chunk);
            callback();
            //callback('esta es una prueba');
        });
    },
    final(callback) {
        console.log("All writes are complete.");
        callback();
    },
    destroy(err, callback) {
        console.log("Stream destroyed.");
        callback(err);
    },
    construct(callback) {
        console.log("Stream constructed.");
        callback();
    },
    destruct(callback) {
        console.log("Stream destructed.");
        callback();
    },
    close(callback) {
        console.log("Stream closed.");
        callback();
    },
    finish(callback) {
        console.log("Stream finished.");
        callback();
    },
    error(err, callback) {
        console.log("Stream error:", err);
        callback(err);
    },
    pipe() {
        console.log("Stream piped.");
    },
    unpipe() {
        console.log("Stream unpiped.");
    },
    pipeOnDrain() {
        console.log("Stream drain event.");
    },
    pipeOnFinish() {
        console.log("Stream finish event.");
    },
    pipeOnClose() {
        console.log("Stream close event.");
    },
    pipeOnError() {
        console.log("Stream error event.");
    },
    pipeOnReadable() {
        console.log("Stream readable event.");
    },
    pipeOnData() {
        console.log("Stream data event.");
    },
    pipeOnEnd() {
        console.log("Stream end event.");
    },
    pipeOnPause() {
        console.log("Stream pause event.");
    },
    pipeOnResume() {
        console.log("Stream resume event.");
    },
    pipeOnDrain() {
        console.log("Stream drain event.");
    },
    pipeOnFinish() {
        console.log("Stream finish event.");
    },
});

slowWriter.on("finish", () => console.log("All writes are complete."));
slowWriter.on("drain", () =>
    console.log("Stream is no longer full, can resume writing."));

const fastReader = new Readable({
    objectMode: true,
    read() { },
});

fastReader.pipe(slowWriter);

for (let i = 0; i < 10; i++) {
    fastReader.push({ data: `Fast data ${i}` });
}


