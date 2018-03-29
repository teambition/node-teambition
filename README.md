```bash
                      __                __                               __      _    __     _                
   ____   ____   ____/ /  ___          / /_  ___   ____ _   ____ ___    / /_    (_)  / /_   (_)  ____    ____
  / __ \ / __ \ / __  /  / _ \ ______ / __/ / _ \ / __ `/  / __ `__ \  / __ \  / /  / __/  / /  / __ \  / __ \
 / / / // /_/ // /_/ /  /  __//_____// /_  /  __// /_/ /  / / / / / / / /_/ / / /  / /_   / /  / /_/ / / / / /
/_/ /_/ \____/ \__,_/   \___/        \__/  \___/ \__,_/  /_/ /_/ /_/ /_.___/ /_/   \__/  /_/   \____/ /_/ /_/

```
[![Build Status](https://travis-ci.org/teambition/node-teambition.svg?branch=master)](https://travis-ci.org/teambition/node-teambition)  [![codecov](https://codecov.io/gh/teambition/node-teambition/branch/master/graph/badge.svg)](https://codecov.io/gh/teambition/node-teambition)  [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

node sdk for teambition


## Installation
```
yarn add teambition
```

## Options
Initialize teambition plugin with the given options.

```JavaScript
Teambition(access_token, { host: "", authHost: "", protocol: "" })
```
Options:

 - `access_token` 用户通过Teambition Account授权获取到的token, 用于验证请求是否合法并经过用户授权
 - `host` 非必需参数, 指定API地址s
 - `authHost` 非必需参数, 指定的认证host地址
 - `resolveWithFullResponse` 非必须参数, 设置为true返回完整response数据
 - `retryStrategy@function` 重试策略, 详细 https://github.com/FGRibreau/node-request-retry
 - `maxAttempts` 最大重试次数，默认 3 次，详细 https://github.com/FGRibreau/node-request-retry


## Usage

* callback
```JavaScript
let accessToken = 'teambition accessToken'
let teambition = new Teambition(accessToken)

let userInfo = await teambition.users().info()

```

## Updates

- # 2018-03-29
  - 新增`重试机制`, HTTP StatusCode > 400 时会发起重试，默认为 3 次

## License

ISC License

Copyright (c) 2017 Teambition
