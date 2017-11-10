import 'babel-polyfill';
import io from 'socket.io-client';
import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import hooks from 'feathers-hooks';
import auth from 'feathers-authentication-client';
import authConfig from './authConfig'

const socket = io('http://localhost:3030', {
  transports: ['websocket'],
  forceNew: true
});

const app = feathers()
  .configure(hooks())
  .configure(socketio(socket))
  .configure(auth(authConfig));

export {app, socket};
