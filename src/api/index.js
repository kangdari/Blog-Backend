import Router from 'koa-router';
import posts from './posts/index.js';
import auth from './auth/index.js';

const api = new Router();

// posts 라우트 적용
api.use('/posts', posts.routes());
// auth 라우트 적용
api.use('/auth', auth.routes());

export default api;
