/* global describe, before, it, beforeEach */
const Teambition = require('../lib/index')
const should = require('should')
const expect = require('expect')
const nock = require('nock')(`http://localhost:3000`)

let accessToken = 'teambition accessToken'
let config = {
  protocol: 'http',
  host: 'localhost:3000/api',
  authHost: 'localhost:3000/authHost',
  maxAttempts: 1
}
let teambition = new Teambition(accessToken, config)
let v1 = new Teambition(accessToken, Object.assign({ endpoints: '/v1' }, config))

describe('Teambition User Testing', () => {
  before(() => {
    nock
      .get('/api/v1/users/me')
      .reply(200, 'ok')
      .patch('/api/v1/users/me')
      .reply(200, 'ok')
      .get('/api/users/me')
      .reply(200, 'ok')
      .get('/api/users/me')
      .reply(200, 'ok')
      .get('/api/users')
      .reply(200, 'ok')
      .post('/api/users/me', {name: 'tbUser'})
      .reply(200, 'ok')
      .post('/api/users/me', {name: 'tbUser'})
      .reply(200, 'ok')
      .put('/api/users/me', {name: 'tbUser'})
      .reply(200, 'ok')
      .put('/api/users/me', {name: 'tbUser'})
      .reply(200, 'ok')
      .delete('/api/users/me', {name: 'tbUser'})
      .reply(200, 'ok')
      .delete('/api/users/me', {name: 'tbUser'})
      .reply(200, 'ok')
      .delete('/api/users/me', {name: 'tbUser'})
      .reply(500, 'failed')
      .delete('/api/users/me', {name: 'tbUser'})
      .reply(500, 'failed')
      .delete('/api/users/me', {name: 'tbUser'})
      .reply(500, 'failed')
      .delete('/api/users/me', {name: 'tbUser'})
      .reply(500, 'failed')
  })

  it('should resolve get user if valid promise request', async function () {
    let userprofile = await teambition.users().info()
    expect(userprofile).toBe('ok')
  })

  it('should ok get user info with v1', async () => {
    let userprofile = await v1
      .get('/users/me')
    expect(userprofile).toBe('ok')
  })

  it('should ok patch user info with v1', async () => {
    let userprofile = await v1
      .patch('/users/me')
    expect(userprofile).toBe('ok')
  })

  it('should resolve get user if valid callback request', async () => {
    let userprofile = await teambition.get('/users/me')
    expect(userprofile).toBe('ok')
  })

  it('should resolve post user if valid promise request', async () => {
    let userprofile = await teambition
      .post('/users/me', {
        name: 'tbUser'
      })
    expect(userprofile).toBe('ok')
  })

  it('should resolve post user if valid callback request', async () => {
    let userprofile = await teambition.post('/users/me', {name: 'tbUser'})
    expect(userprofile).toBe('ok')
  })

  it('should resolve put user if valid promise request', async () => {
    let userprofile = await teambition
      .put('/users/me', {
        name: 'tbUser'
      })
    expect(userprofile).toBe('ok')
  })

  it('should resolve put user if valid callback request', async () => {
    let userprofile = await teambition.put('/users/me', {name: 'tbUser'})
    expect(userprofile).toBe('ok')
  })

  it('should resolve delete user if valid promise request', async () => {
    let userprofile = await teambition
      .del('/users/me', {
        name: 'tbUser',
        headers: {
          'x-credential': 'jwt'
        }
      })
    expect(userprofile).toBe('ok')
  })

  it('should resolve delete user if valid callback request', async () => {
    let userprofile = await teambition.del('/users/me', {name: 'tbUser'})
    expect(userprofile).toBe('ok')
  })

  it('should reject delete user if valid promise request', async () => {
    let res = await teambition
      .del('/users/me', {
        name: 'tbUser',
        headers: {
          'x-credential': 'jwt'
        }
      })
    expect(res).toBe('failed')
  })

  it('should reject delete user if valid callback request', async () => {
    let res = await teambition.del('/users/me', {name: 'tbUser'})
    expect(res).toBe('failed')
  })

  it('should resolve getAuthorizeUrl if valid request', async () => {
    let auth = await teambition.getAuthorizeUrl('tb-01', '/test', 'true')
    should.exist(auth)
  })

  it('should resolve getAccessTokenUrl if valid request', async () => {
    let accessTokenUrl = await teambition.getAccessTokenUrl()
    should.exist(accessTokenUrl)
  })

  it('should resolve authCallback if valid request', async () => {
    let authCallback = await teambition.authCallback('tb-01', 'teambition')
    should.exist(authCallback)
  })

  it('should resolve authCoCallback if valid request', async () => {
    let authCallback = await teambition.authCoCallback('tb-01', 'teambition')
    should.exist(authCallback)
  })

  describe('promise style request method', function () {
    let teambitionClientRespFull

    beforeEach(function () {
      nock
        .get('/api/users/me')
        .reply(200, 'ok')
      const fullRespConf = Object.create(config)
      fullRespConf.resolveWithFullResponse = true
      teambitionClientRespFull = new Teambition(accessToken, fullRespConf)
    })

    it('should return a promise by request', function (done) {
      const res = teambitionClientRespFull.get('/users/me')
      should(res).be.instanceOf(Promise)
      done()
    })

    it('should both has resp & body', async function () {
      let res = await teambitionClientRespFull.get('/users/me')
      should(res).be.instanceOf(Object)
      should(res).has.property('statusCode')
      should(res).property('body').be.eql('ok')
    })

    it('should only has body', async function () {
      let body = await teambition.get('/users/me')
      should(body).be.instanceOf(Object)
      should(body).not.has.properties(['headers', 'statusCode'])
      should(body).be.eql('ok')
    })
  })
})
