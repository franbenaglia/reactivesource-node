const { Climate } = require('./climate');

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
    return (Math.random() * 100000);
}

const fmaxBoundaryClimate = (channel) => {

    const temperature = (Math.random() * MAX_TEMP_VARIATION) * aleatorySign() + MAX_TEMP_AVERAGE;
    const humidity = 50.0;

    return new Climate(temperature, humidity, channel, 0, new Date(), 7);
}

const fminBoundaryClimate = (channel) => {

    const temperature = (Math.random() * MIN_TEMP_VARIATION * aleatorySign()) + MIN_TEMP_AVERAGE;
    const humidity = 40.0;

    return new Climate(temperature, humidity, channel, 0, new Date(), 7);
}

channel = randomLong();

const maxBoundaryClimate = fmaxBoundaryClimate(channel);
const minBoundaryClimate = fminBoundaryClimate(channel);

const slope = fslope();

module.exports = { maxBoundaryClimate, minBoundaryClimate, slope };