const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}


function makeRangeIterator(start = 0, end = Infinity, step = 1) {
    let nextIndex = start;
    let iterationCount = 0;

    const rangeIterator = {
        next() {
            let result;
            if (nextIndex < end) {
                result = { value: nextIndex, done: false };
                nextIndex += step;
                iterationCount++;
                return result;
            }
            return { value: iterationCount, done: true };
        },
    };
    return rangeIterator;
}

const iter = makeRangeIterator(0,100,1);

let result = iter.next();
while (!result.done) {
    sleep(1000).then(() => {
        console.log(result.value); // 1 3 5 7 9
        result = iter.next();
    })
}

console.log("Iterated over sequence of size:", result.value); // [5 numbers returned, that took interval in between: 0 to 10]
