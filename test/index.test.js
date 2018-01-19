const Teambition = require('../lib/index')
const should = require('should')
const expect = require('expect')
const nock = require('nock')(`http://localhost:3000`)

let accessToken = 'teambition accessToken'
let config = {
  protocol: 'http',
  host: 'localhost:3000/api',
  authHost: 'localhost:3000/authHost'
}
let teambition = new Teambition(accessToken, config)
describe('Teambition SDK Testing', () => {
  before(() => {
    nock
      .get('/api/users/me')
      .reply(200, 'ok')
      .get('/api/users/me')
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
  })

  it('should resolve get user if valid promise request', (done) => {
    teambition
      .get('/users/me')
      .then(userprofile => {
        expect(userprofile).toBe('ok')
        done()
      })
  })

  it('should resolve get user if valid callback request', (done) => {
    teambition.get('/users/me', (err, userprofile) => {
      // user's profile
      if (err) throw err
      expect(userprofile).toBe('ok')
      done()
    })
  })

  it('should resolve post user if valid promise request', (done) => {
    teambition
      .post('/users/me', {
        name: 'tbUser'
      })
      .then(userprofile => {
        expect(userprofile).toBe('ok')
        done()
      })
  })

  it('should resolve post user if valid callback request', (done) => {
    teambition.post('/users/me', {name: 'tbUser'}, (err, userprofile) => {
      // user's profile
      if (err) throw err
      expect(userprofile).toBe('ok')
      done()
    })
  })

  it('should resolve put user if valid promise request', (done) => {
    teambition
      .put('/users/me', {
        name: 'tbUser'
      })
      .then(userprofile => {
        expect(userprofile).toBe('ok')
        done()
      })
  })

  it('should resolve put user if valid callback request', (done) => {
    teambition.put('/users/me', {name: 'tbUser'}, (err, userprofile) => {
      // user's profile
      if (err) throw err
      expect(userprofile).toBe('ok')
      done()
    })
  })

  it('should resolve delete user if valid promise request', (done) => {
    teambition
      .del('/users/me', {
        name: 'tbUser',
        headers: {
          'x-credential': 'jwt'
        }
      })
      .then(userprofile => {
        expect(userprofile).toBe('ok')
        done()
      })
  })

  it('should resolve delete user if valid callback request', (done) => {
    teambition.del('/users/me', {name: 'tbUser'}, (err, userprofile) => {
      // user's profile
      if (err) throw err
      expect(userprofile).toBe('ok')
      done()
    })
  })

  it('should reject delete user if valid promise request', (done) => {
    teambition
      .del('/users/me', {
        name: 'tbUser',
        headers: {
          'x-credential': 'jwt'
        }
      })
      .then(err => {
        expect(err).toBe('failed')
        done()
      })
  })

  it('should reject delete user if valid callback request', (done) => {
    teambition.del('/users/me', {name: 'tbUser'}, (err, userprofile) => {
      // user's profile
      expect(err).toBe('failed')
      done()
    })
  })

  it('should resolve getAuthorizeUrl if valid request', (done) => {
    let auth = teambition.getAuthorizeUrl('tb-01', '/test', 'true')
    should.exist(auth)
    done()
  })

  it('should resolve getAccessTokenUrl if valid request', (done) => {
    let accessTokenUrl = teambition.getAccessTokenUrl()
    should.exist(accessTokenUrl)
    done()
  })

  it('should resolve authCallback if valid request', (done) => {
    let authCallback = teambition.authCallback('tb-01', 'teambition')
    should.exist(authCallback)
    done()
  })

  it('should resolve authCoCallback if valid request', (done) => {
    let authCallback = teambition.authCoCallback('tb-01', 'teambition')
    should.exist(authCallback)
    done()
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

    it('should both has resp & body', function (done) {
      const res = teambitionClientRespFull.get('/users/me')
        .then(function(res) {
          should(res).be.instanceOf(Object)
          should(res).has.property('statusCode')
          should(res).property('body').be.eql('ok')
          done()
        })
    })

    it('should only has body', function (done) {
      teambition.get('/users/me')
        .then((body) => {
          should(body).be.instanceOf(Object)
          should(body).not.has.properties(['headers', 'statusCode'])
          should(body).be.eql('ok')
          done()
      })
    })
  })
})
