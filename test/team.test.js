/* global describe, before, it */
const Teambition = require('../lib/index')
const expect = require('expect')
const nock = require('nock')(`http://localhost:3000`)

let accessToken = 'teambition accessToken'
let config = {
  protocol: 'http',
  host: 'localhost:3000/api',
  authHost: 'localhost:3000/authHost',
  endpoints: '/v2'
}
let teambition = new Teambition(accessToken, config)
describe('Teambition Team Testing', () => {
  before(() => {
    nock
      .get('/api/v2/organizations/123/teams')
      .reply(200, 'ok')
      .get('/api/v2/projects/123/teams')
      .reply(200, 'ok')
      .get('/api/v2/teams/123')
      .reply(200, 'ok')
      .get('/api/v2/teams/me?_organizationId=123')
      .reply(200, 'ok')
      .post('/api/v2/teams', { _organizationId: '123', name: 'A' })
      .reply(200, 'ok')
  })

  it('should get org-teams', function (done) {
    teambition.organizations('123').teams().list((err, teams) => {
      if (err) throw err
      expect(teams).toBe('ok')
      done()
    })
  })

  it('should get project-teams', function (done) {
    teambition.projects('123').teams().list((err, teams) => {
      if (err) throw err
      expect(teams).toBe('ok')
      done()
    })
  })

  it('should get team info', function (done) {
    teambition.teams('123').info((err, team) => {
      if (err) throw err
      expect(team).toBe('ok')
      done()
    })
  })

  it('should get my joined teams', function (done) {
    teambition.teams()
      .me()
      .joined({ _organizationId: '123' }, (err, team) => {
        if (err) throw err
        expect(team).toBe('ok')
        done()
      })
  })

  it('should create team', function (done) {
    teambition.teams()
      .create({
        _organizationId: '123',
        name: 'A'
      }, (err, team) => {
        if (err) throw err
        expect(team).toBe('ok')
        done()
      })
  })
})
