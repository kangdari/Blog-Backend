import Router from 'koa-router';
import posts from './posts/index.js'

const api = new Router();

// posts 라우트 적용
api.use('/posts', posts.routes());

export default api;