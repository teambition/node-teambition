module.exports = {
  description: '创建任务',
  links: [{
    description: '创建任务',
    href: '/tasks',
    method: 'POST',
    title: 'create',
    properties: {
      _projectId: {
        type: 'string'
      }
    },
    required: ['_projectId']
  }]
}
