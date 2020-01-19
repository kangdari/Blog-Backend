import Router from 'koa-router';
import * as postCtrl from './posts.ctrl.js';

const posts = new Router();

posts.get('/', postCtrl.list);
posts.post('/', postCtrl.write);
posts.get('/:id', postCtrl.checkObjecId, postCtrl.read);
posts.delete('/:id', postCtrl.checkObjecId, postCtrl.remove);
posts.patch('/:id', postCtrl.checkObjecId, postCtrl.update);

export default posts;
