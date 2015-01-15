Teambition = require('../src')

access_token = "teambition access_token"
teambition = new Teambition(access_token)

teambition.get '/users/me', (err, user) ->
  # user's profile
  console.log err, user