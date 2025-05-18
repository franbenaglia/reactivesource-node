const Climate = require('./climate');

const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

const climateMock = () => {

    const TIME_GAP = 500;

    const MAX_TEMP_AVERAGE = 30.0;
    const MIN_TEMP_AVERAGE = -5.0;

    const MAX_TEMP_VARIATION = 4.0;
    const MIN_TEMP_VARIATION = 4.0;

    const SLOPE_MAX = 200;
    const SLOPE_MIN = 150;


    const aleatorySign = () => {
        return Math.random() > 0.5 ? 1 : -1;
    }

    const fslope = () => {
        return Math.random() * (SLOPE_MAX - SLOPE_MIN);
    }

    const randomLong = () => {
        return (long)(Math.random() * 100000);
    }

    const fmaxBoundaryClimate = (channel) => {

        const temperature = (Math.random() * MAX_TEMP_VARIATION) * aleatorySign() + MAX_TEMP_AVERAGE;
        const humidity = 50.0;

        return new Climate(temperature, humidity, channel, 0, new Date());
    }

    const fminBoundaryClimate = (channel) => {

        const temperature = (Math.random() * MIN_TEMP_VARIATION * aleatorySign()) + MIN_TEMP_AVERAGE;
        const humidity = 40.0;

        return new Climate(temperature, humidity, channel, 0, new Date());
    }

    channel = randomLong();

    const maxBoundaryClimate = fmaxBoundaryClimate(channel);
    const minBoundaryClimate = fminBoundaryClimate(channel);

    const slope = fslope();

    const wrapper = {
        rising: true,
        idx: 1
    };

    const rate = (maxBoundaryClimate.temperature - minBoundaryClimate.temperature) / slope;

    const c = minBoundaryClimate;

    const getClimateData = () => {

        if (c.temperature < maxBoundaryClimate.temperature && wrapper.rising) {
            c.temperature = c.temperature + rate;
            return new Climate(c.temperature, c.humidity, channel, wrapper.idx++, new Date());
        } else {
            wrapper.rising = false;
        }

        if (c.temperature > minBoundaryClimate.temperature && !wrapper.rising) {
            c.temperature = c.temperature - rate;
            return new Climate(c.temperature, c.humidity, channel, wrapper.idx++, new Date());
        } else {
            wrapper.rising = true;
            wrapper.idx = 0;
            return new Climate(c.temperature - rate, c.humidity, channel, wrapper.idx++, new Date());
        }

    }

    setInterval(getClimateData, 1000);


}

const climateSource = () => {
    console.log("pasando por climatesource");
    eventEmitter.emit('myEvent', "Event occurred from mock");
    /*
    for (var i = 0; i < 9; i++) {
        setTimeout(function () {
            any.emit('myEvent', "Event occurred from mock");
        }, 1000);
    }
   */
}

module.exports = { climateSource, eventEmitter };

/*


UnaryOperator < Climate > opx = c -> {


    if(c.temperature() < maxBoundaryClimate.temperature() && wrapper.rising) {
    return new Climate(c.temperature() + rate, c.humidity(), channel, wrapper.idx++, new Date());
} else {
    wrapper.rising = false;
}

if (c.temperature() > minBoundaryClimate.temperature() && !wrapper.rising) {
    return new Climate(c.temperature() - rate, c.humidity(), channel, wrapper.idx++, new Date());
} else {
    wrapper.rising = true;
    wrapper.idx = 0;
    return new Climate(c.temperature() - rate, c.humidity(), channel, wrapper.idx++, new Date());
}

};

Stream < Climate > tempStream = Stream.iterate(minBoundaryClimate, opx);
Flux < Climate > infiniteTempStream = Flux.fromStream(tempStream);

return infiniteTempStream
    .delayElements(Duration.ofMillis(TIME_GAP));

}

*/