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

  it('should get org-groups', function (done) {
    teambition.organizations('123').groups().list((err, groups) => {
      if (err) throw err
      expect(groups).toBe('ok')
      done()
    })
  })

  it('should get project-groups', function (done) {
    teambition.projects('123').groups().list((err, groups) => {
      if (err) throw err
      expect(groups).toBe('ok')
      done()
    })
  })

  it('should get team info', function (done) {
    teambition.groups('123').info((err, group) => {
      if (err) throw err
      expect(group).toBe('ok')
      done()
    })
  })
})
