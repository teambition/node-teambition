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

  it('should get org-teams', async function () {
    let teams = await teambition.organizations('123').teams().list()
    expect(teams).toBe('ok')
  })

  it('should get project-teams', async function () {
    let teams = await teambition.projects('123').teams().list()
    expect(teams).toBe('ok')
  })

  it('should get team info', async function () {
    let team = await teambition.teams('123').info()
    expect(team).toBe('ok')
  })

  it('should get my joined teams', async function () {
    let team = await teambition.teams()
      .me()
      .joined({ _organizationId: '123' })
    expect(team).toBe('ok')
  })

  it('should create team', async function () {
    let team = await teambition.teams()
      .create({
        _organizationId: '123',
        name: 'A'
      })
    expect(team).toBe('ok')
  })
})
