const { Climate } = require('./climate');

const { maxBoundaryClimate, minBoundaryClimate, slope } = require('./random-values');

const c = Object.create(minBoundaryClimate);

const wrapper = {
    rising: true,
    idx: 1
};

const climateMock = () => {

    const rate = (maxBoundaryClimate.temperature - minBoundaryClimate.temperature) / slope;

    const getClimateData = () => {

        if (c.temperature < maxBoundaryClimate.temperature && wrapper.rising) {
            c.temperature = c.temperature + rate;
            return new Climate(c.temperature, c.humidity, channel, wrapper.idx++, new Date(), 7);
        } else {
            wrapper.rising = false;
        }

        if (c.temperature > minBoundaryClimate.temperature && !wrapper.rising) {
            c.temperature = c.temperature - rate;
            return new Climate(c.temperature, c.humidity, channel, wrapper.idx++, new Date(), 7);
        } else {
            wrapper.rising = true;
            wrapper.idx = 0;
            return new Climate(c.temperature - rate, c.humidity, channel, wrapper.idx++, new Date(), 7);
        }

    }

    return getClimateData();

}

module.exports = { climateMock };

