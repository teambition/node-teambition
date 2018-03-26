module.exports = {
  description: '群组相关接口',
  links: [{
    description: '获取企业下群组',
    href: '/organizations/{_organizationId}/groups',
    method: 'GET',
    title: 'list',
    properties: {
      descending: {
        type: 'boolean'
      },
      pageSize: {
        type: 'number'
      },
      pageToken: {
        type: 'string'
      }
    }
  }, {
    description: '获取项目下群组',
    href: '/projects/{_projectId}/groups',
    method: 'GET',
    title: 'list'
  }, {
    description: '获取单个群组信息',
    href: '/groups/{_id}',
    method: 'GET',
    title: 'info'
  }]
}
