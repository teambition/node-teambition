http  = require('http')
https = require('https')
qs    = require('querystring')

class Teambition

  port: 443
  host: 'api.teambition.com'

  constructor: (@token, host, port) ->
    @port = port if port
    @host = host if host
    @protocol = if @port is 443 then https else http

  invokeGeneric: (method, apiURL, params, callback) ->
    if typeof params is 'function'
      callback = params
      params = {}

    params or= {}
    
    options =
      host: @host
      port: @port
      path: apiURL
      method: method
      headers: 
        "Authorization": "OAuth2 #{@token}"

    if method.toLowerCase() is 'get'
      options.path += "?" + qs.stringify(params)
    else
      postData = JSON.stringify(params)
      options.headers["Content-Type"] = "application/json"
      options.headers["Content-Length"] = postData.length

    req = @protocol.request options, (res) ->
      res.setEncoding('utf8')
      data = ""

      res.on 'data', (part) ->
        data += part

      res.on "end", ->
        if res.statusCode isnt 200
          callback(data)
        else
          callback(null, JSON.parse(data))

    req.write(postData) if method.toLowerCase() isnt 'get'
    req.end()

    req.on 'error', (e) ->
      throw e

  api: (apiURL, params, callback) ->
    @invokeGeneric('GET', apiURL, params, callback)

  get: -> @api.apply(@, arguments)

  post: (apiURL, params, callback) ->
    @invokeGeneric('POST', apiURL, params, callback)

  put: (apiURL, params, callback) ->
    @invokeGeneric('PUT', apiURL, params, callback)

  del: (apiURL, params, callback) ->
    @invokeGeneric('DELETE', apiURL, params, callback)

exports = module.exports = Teambition