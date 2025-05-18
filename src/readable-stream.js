const { Readable } = require('stream');

const inStream = new Readable({
    read() { }
});

for (let i = 0; i < 10; i++) {
    inStream.push('ABCDEFGHIJKLM');
    inStream.push('NOPQRSTUVWXYZ');
    sleep(10000);
}

inStream.push(null);

inStream.pipe(process.stdout);

async function init() {
    console.log(1);
    await sleep(1000);
    console.log(2);
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}