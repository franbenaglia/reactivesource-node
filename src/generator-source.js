const { climateMock } = require('./climate-mock');

function delayedValue(time, value) {
    return new Promise((resolve /*, reject*/) => {
        setTimeout(() => resolve(value), time);
    });
}

async function* numberGenerator() {
    let i = 1;
    let x = 1;
    while (x < 10) {
        yield delayedValue(1000, i++);
        if (i > 10) {
            i = 1;
            x++;
        }
    }
}

async function* climateGenerator() {
    while (true) {
        //console.log(climateMock());
        yield delayedValue(1000, climateMock());
    }
}



module.exports = {
    numberGenerator, climateGenerator
};