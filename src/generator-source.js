const test = () => {
    console.log("test");
};

function* numberGenerator() {
    let i = 1;
    while (true) {
        yield i++;
        if (i > 10) {
            i = 1;
        }
    }
}

const generator = numberGenerator();

const intervalId = setInterval(() => {
    const result = generator.next();
    if (!result.done) {
        console.log(result.value);
    } else {
        clearInterval(intervalId);
        console.log("Generator is done.");
    }
}, 1000);

module.exports = { numberGenerator };