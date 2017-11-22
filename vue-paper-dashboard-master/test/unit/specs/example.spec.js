import Zip from '../../../src/main/example'
import assert from 'assert'

describe('Scenario: use zip', function () {
  beforeEach(function () {
    console.log('準備測試')
  })
  afterEach(function () {
    console.log('清除測試')
  })
  it('我希望我能看到使用的zip格式', function () {
    let rar = new Zip('rar')
    assert.equal('鄰杯係: rar', rar.getType())
  })
  it('我希望我能看到輸入的資料格式', function () {
    let zip = new Zip('zip', 'json')
    assert.equal('json', zip.getDataFormat())
  })
})
