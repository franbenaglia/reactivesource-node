// Climate class to represent climate data
function Climate(temperature, humidity, channel, idx, date, group) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.channel = channel;
    this.idx = idx;
    this.date = date;
    this.group = group;
}


module.exports = { Climate };