const app = require('./app');
const logger = require('./middleware/logger')(app)
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Runing on http://%s:%d', app.get('host'), port)
);