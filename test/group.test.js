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
describe('Teambition Group Testing', () => {
  before(() => {
    nock
      .get('/api/v2/organizations/123/groups')
      .reply(200, 'ok')
      .get('/api/v2/projects/123/groups')
      .reply(200, 'ok')
      .get('/api/v2/groups/123')
      .reply(200, 'ok')
  })

  it('should get org-groups', async function () {
    let groups = await teambition.organizations('123').groups().list()
    expect(groups).toBe('ok')
  })

  it('should get project-groups', async function () {
    let groups = await teambition.projects('123').groups().list()
    expect(groups).toBe('ok')
  })

  it('should get team info', async function () {
    let group = await teambition.groups('123').info()
    expect(group).toBe('ok')
  })
})
