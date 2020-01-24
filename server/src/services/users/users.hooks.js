const local = require('@feathersjs/authentication-local');
const jwt = require('jsonwebtoken');

const handleCreateOAuth = context => {
  if (context.data.facebook) {
    context.data.name = context.data.facebook.profile.displayName;
    context.data.email =context.data.facebook.profile.emails[0].value;
    context.data.oauth = 'facebook'
  }
  else if (context.data.google) {
    //context.data.name = context.data.facebook.profile.displayName;
    //context.data.email =context.data.facebook.profile.emails[0].value;
    context.data.oauth = 'google'
  }
}

module.exports = {
  before: {
    all: [],
    find: [
      (context) => {
        if (context.params.query.accessToken !== undefined) {
          const accessToken = context.params.query.accessToken
          const decoded = jwt.decode(accessToken)
          const uid = decoded.userId
          context.params.query._id = uid
          return context
        }
      }
    ],
    get: [],
    create: [
      // handleCreateOAuth,
      local.hooks.hashPassword()
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      (context) => {
        if (context.params.user !== undefined) {
          context.result.user = context.params.user
        }
        
        return context
      }
    ],
    get: [],
    create: [
      // local.hooks.protect('password')
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};