/* global describe, before, it */
const Teambition = require('../lib/index')
const expect = require('expect')
const nock = require('nock')(`http://localhost:3000`)

let accessToken = 'teambition accessToken'
let config = {
  protocol: 'http',
  host: 'localhost:3000/appstore/api',
  authHost: 'localhost:3000/authHost'
}
let teambition = new Teambition(accessToken, config)
describe('Teambition Chat Testing', () => {
  before(() => {
    nock
      .post('/appstore/api/developer/chats/message')
      .reply(200, 'ok')
  })

  it('should send chat message', function (done) {
    teambition.developer().chats().message().send({
      _organizationId: '123',
      messageType: 'text',
      text: 'hello',
      toType: 'users',
      users: ['1']
    }, (err, resp) => {
      if (err) throw err
      expect(resp).toBe('ok')
      done()
    })
  })
})
