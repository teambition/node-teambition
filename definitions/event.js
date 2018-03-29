module.exports = {
  description: 'Query events that happen to your emails. See http://documentation.mailgun.com/api-events.html',
  links: [{
    description: 'Queries event records.',
    href: '/events',
    method: 'GET',
    title: 'get',
    properties: {
      _projectId: {
        type: 'string'
      }
    },
    required: ['_projectId']
  }]
}
