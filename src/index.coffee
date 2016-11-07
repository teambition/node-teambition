request     = require('request')
querystring = require('querystring')

class Teambition

  protocol: 'https'
  host: 'api.teambition.com'
  authHost: 'account.teambition.com'

  constructor: (@token, config = {}) ->
    @host = config.host if config.host
    @authHost = config.authHost if config.authHost
    @protocol = config.protocol if config.protocol

  getAuthorizeUrl: (client_id, redirect_uri, state) ->
    qs = querystring.stringify({
      client_id:client_id
      redirect_uri: redirect_uri
      state: state
    })
    "#{@protocol}://#{@authHost}/oauth2/authorize?#{qs}"

  getAccessTokenUrl: ->
    "#{@protocol}://#{@authHost}/oauth2/access_token"

  authCallback: (client_id, client_secret) ->
    self = @
    (req, res, next) ->
      { code } = req.query
      api = self.getAccessTokenUrl()
      self.post api, {
        client_id: client_id
        client_secret: client_secret
        code: code
      }, (err, body) ->
        req.callbackBody = body
        next()

  invokeGeneric: (method, apiURL, params, callback) ->

    if typeof params is 'function'
      callback = params
      params = {}

    params or= {}

    if apiURL.indexOf('/') is 0
      apiURL = "#{@protocol}://#{@host}#{apiURL}"

    headers = 'Content-Type': 'application/json'
    headers["Authorization"] = "OAuth2 #{@token}" if @token
    if params.headers
      headers = params.headers
      delete params.headers

    options =
      method: method
      headers: headers
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
