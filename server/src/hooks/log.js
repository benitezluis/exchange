const logger = require('../middleware/logger');
const util = require('util');

// To see more detailed messages, uncomment the following line:
// logger.level = 'debug';

module.exports = function () {
  return context => {
    const loggerInstance = logger(context.app)
    loggerInstance.debug(`${context.type} | app.service('${context.path}').${context.method}()`);
    
    if(typeof context.toJSON === 'function' && logger.level === 'debug') {
      loggerInstance.debug('Hook Context', util.inspect(context, {colors: false}));
    }
    if (context.error) {
      delete context.error.app
      delete context.error.hook
      const meta = {'error':context.error,'stack':context.error.stack}
      loggerInstance.error(`service('${context.path}').method(${context.method}) - ${context.error.name}`, JSON.stringify(meta))
      //{'error': context.error}, {'stack': context.error.stack});
    }
  };
};