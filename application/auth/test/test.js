import { expect } from 'chai'

<<<<<<< HEAD
describe('Mongodb environment variable', function () {
  it('should equal mongodb://mongodb:27017/follows', function () {
    expect(process.env.DB_CONNECTION_STRING).to.equal('mongodb://mongodb:27017/follows')
=======
// The connectivity tests for each service is found in the Gateway-service.

describe('Mongodb environment variable', function () {
  it('should equal mongodb://mongodb:27017/auth', function () {
    expect(process.env.DB_CONNECTION_STRING).to.equal('mongodb://mongodb:27017/auth')
>>>>>>> origin
  })
})
