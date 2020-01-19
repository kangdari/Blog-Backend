const Koa = require('koa');
const Router = require('koa-Router');
// api 모듈 불러옴
const api = require('./api/index.js');

const app = new Koa();
const router = new Router();

// api 라우터 적용
router.use('/api', api.routes());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, ()=>{
    console.log('port 4000')
})