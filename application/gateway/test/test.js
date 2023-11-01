import { expect } from 'chai'
import fetch from 'node-fetch'

describe('Test-lit route/service', function () {
  it('should equal "LIT CONTROLLER ACTIVATED"', async function () {
    const res = await fetch('http://localhost/gateway/test-lit')

    const controllerMsg = await res.json()

    expect(res.status).to.equal(200)
    expect(controllerMsg.message).to.equal('LIT CONTROLLER ACTIVATED')
  })
})

describe('Test-follow route/service', function () {
  it('should equal "FOLLOW CONTROLLER ACTIVATED"', async function () {
    const res = await fetch('http://localhost/gateway/test-follow')

    const controllerMsg = await res.json()

    expect(res.status).to.equal(200)
    expect(controllerMsg.message).to.equal('FOLLOW CONTROLLER ACTIVATED')
  })
})

describe('Test-litterbox route/service', function () {
  it('should equal "LITTERBOX CONTROLLER ACTIVATED"', async function () {
    const res = await fetch('http://localhost/gateway/test-litterbox')

    const controllerMsg = await res.json()

    expect(res.status).to.equal(200)
    expect(controllerMsg.message).to.equal('LITTERBOX CONTROLLER ACTIVATED')
  })
})


describe('Test-pedigree route/service', function () {
  it('should equal "PEDIGREE CONTROLLER ACTIVATED"', async function () {
    const res = await fetch('http://localhost/gateway/test-pedigree-svc')

    const controllerMsg = await res.json()

    expect(res.status).to.equal(200)
    expect(controllerMsg.message).to.equal('PEDIGREE CONTROLLER ACTIVATED')
  })
})

describe('Test-auth route/service', function () {
  it('should equal AUTH CONTROLLER ACTIVATED', async function () {
    const res = await fetch('http://localhost/gateway/test-auth')

    const controllerMsg = await res.json()

    expect(res.status).to.equal(200)
    expect(controllerMsg.message).to.equal('AUTH CONTROLLER ACTIVATED')
  })
})

