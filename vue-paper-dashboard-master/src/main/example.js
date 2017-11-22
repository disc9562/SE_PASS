module.exports = class Zip {
  constructor (type) {
    this.type = type
  }
  getType () {
    return '鄰杯係:' + this.type
  }
}
