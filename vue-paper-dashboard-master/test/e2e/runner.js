'use strict'

// Set BABEL_ENV to use proper preset config
process.env.BABEL_ENV = 'testing-e2e'

// Enable use of es2015 on required files
require('babel-register')({
  ignore: /node_modules/
})

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

const Browser = require('zombie')

Browser.localhost('SE_Team3_PASS_Acceptance_Test.com', 8888)
let browser = new Browser()
