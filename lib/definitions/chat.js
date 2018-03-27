module.exports = {
  description: 'Query events that happen to your emails. See http://documentation.mailgun.com/api-events.html',
  links: [{
    description: 'Queries event records.',
    href: '/developer/chats/message',
    method: 'POST',
    title: 'send',
    properties: {
      _organizationId: {
        type: 'string'
      },
      toType: {
        type: 'string'
      },
      users: {
        type: 'array'
      },
      projects: {
        type: 'array'
      },
      groups: {
        type: 'array'
      },
      object: {
        type: 'object'
      },
      messageType: {
        type: 'string'
      },
      text: {
        type: 'string'
      }
    },
    required: ['_organizationId', 'messageType', 'text', 'toType']
  }]
}
