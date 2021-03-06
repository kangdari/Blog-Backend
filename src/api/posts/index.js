import Router from 'koa-router';
import * as postCtrl from './posts.ctrl.js';
import checkLoggedIn from '../../lib/checkLoggedIn.js';

const posts = new Router();

posts.get('/', postCtrl.list);
posts.post('/', checkLoggedIn, postCtrl.write);
posts.get('/:id', postCtrl.getPostById, checkLoggedIn, postCtrl.read);
posts.delete('/:id', postCtrl.getPostById, checkLoggedIn, postCtrl.checkOwnPost, postCtrl.remove);
posts.patch('/:id', postCtrl.getPostById, postCtrl.checkOwnPost, postCtrl.update);

export default posts;
