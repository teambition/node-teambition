request = require('request')

class Teambition

  protocol: 'https'
  host: 'api.teambition.com'

  constructor: (@token, host, protocol) ->
    @host = host if host
    @protocol = protocol if protocol

  invokeGeneric: (method, apiURL, params, callback) ->

    if typeof params is 'function'
      callback = params
      params = {}

    params or= {}

    apiURL = "#{@protocol}://#{@host}#{apiURL}"

    options =
      method: method
      headers:
        'Content-Type': 'application/json'
        "Authorization": "OAuth2 #{@token}"
      url: apiURL
      json: true

    if method.toLowerCase() isnt 'get'
      options.form = params
    else
      options.qs = params

    request options, (err, resp, body) ->
      if err or resp and resp.statusCode isnt 200
        err or= body
      callback(err, body)

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
