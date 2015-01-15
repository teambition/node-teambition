# node-teambition
node sdk for teambition

## 安装
```
npm i teambition
```

## 参数说明

Teambition(access_token, host, port)

- access_token: 用户通过Teambition Account授权获取到的token, 用于验证请求是否合法并经过用户授权
- host: `非必需参数`, 指定API地址
- port: `非必需参数`, 指定API地址的端口号


## 使用
```
Teambition = require('teambition')
teambition = new Teambition('access_token')

teambition.api '/users/me', (err, user) ->
  # 获取到个人信息
```