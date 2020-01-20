import Router from 'koa-Router';
import * as authCtrl from './auth.js'

const auth = new Router();

auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/check', authCtrl.checkLogin);
auth.post('/logout', authCtrl.logout);

export default auth;