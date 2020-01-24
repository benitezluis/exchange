
// App
const logger = require('./middleware/logger');

const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const configuration = require('@feathersjs/configuration');
const socketio = require('@feathersjs/socketio');

const mongoose = require('./db/mongoose');
const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const auth = require('./auth');

const app = express(feathers());

// Config
app.configure(configuration());

//
app.configure(socketio());
app.on('connection', connection => app.channel('everybody').join(connection));
app.publish(() => app.channel('everybody'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Plugins and providers
app.configure(mongoose);

app.configure(express.rest());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range');

  next();
});

// Set up services and so on
app.configure(middleware);
app.configure(auth)
// Services
app.configure(services);

// Error handler
const loggerInstance = logger(app);
app.use(express.notFound({ verbose: false }))
app.use(express.errorHandler({html:false, loggerInstance }));
app.hooks(appHooks);

module.exports = app;
