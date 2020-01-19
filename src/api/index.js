const Router = require("koa-router");
const posts = require('./posts/index.js');

const api = new Router();

// posts 라우트 적용
api.use('/posts', posts.routes());

module.exports = api;