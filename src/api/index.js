//  FeathersJS
import feathers from '@feathersjs/client'
// import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
// import auth from '@feathersjs/authentication-client'

export const baseUrl = 'http://localhost:3030'
const socket = io(baseUrl);
const APIclient = feathers();

APIclient.configure(feathers.socketio(socket)).configure(feathers.activateHooks);
APIclient.configure(feathers.authentication({storage: window.localStorage, cookie: 'gnz-jwt', storageKey: 'gnz-jwt'}))

export default APIclient;