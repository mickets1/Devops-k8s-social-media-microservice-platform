import { expect } from 'chai'

// The connectivity tests for each service is found in the Gateway-service.
describe('Mongodb environment variable', function () {
  it('should equal mongodb://mongodb:27017/pedigrees', function () {
    expect(process.env.DB_CONNECTION_STRING).to.equal('mongodb://mongodb:27017/pedigrees')
  })
})
