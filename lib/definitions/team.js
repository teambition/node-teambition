module.exports = {
  description: '部门相关接口',
  links: [{
    description: '获取企业下部门',
    href: '/organizations/{_organizationId}/teams',
    method: 'GET',
    title: 'list',
    properties: {
      onlyFirstLevel: {
        type: 'boolean'
      }
    }
  }, {
    description: '获取项目下部门',
    href: '/projects/{_projectId}/teams',
    method: 'GET',
    title: 'list'
  }, {
    description: '获取单个部门信息',
    href: '/teams/{_id}',
    method: 'GET',
    title: 'info'
  }, {
    description: '获取我加入的部门列表',
    href: '/teams/me',
    method: 'GET',
    title: 'joined',
    properties: {
      _organizationId: {
        type: 'string'
      }
    },
    required: ['_organizationId']
  }, {
    description: '创建部门',
    href: '/teams',
    method: 'POST',
    title: 'create',
    properties: {
      _organizationId: {
        type: 'string'
      },
      name: {
        type: 'string'
      },
      _parentId: {
        type: 'string'
      },
      style: {
        type: 'string'
      }
    },
    required: ['_organizationId', 'name']
  }]
}
