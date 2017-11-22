module.exports = class Zip {
  constructor (type, dataFormat) {
    this.type = type
    this.dataFormat = dataFormat
  }
  getType () {
    return '鄰杯係: ' + this.type
  }
  getDataFormat () {
    return this.dataFormat
  }
}
