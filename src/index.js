require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-Router');
const bodyParser = require('koa-bodyparser');
const mongooes = require('mongoose');
// api 모듈 불러옴
const api = require('./api/index.js');

// 비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 생성
const { PORT, MONGO_URL } = process.env;

mongooes
    .connect(MONGO_URL, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(e => {
        console.log(e);
    });

const app = new Koa();
const router = new Router();

// api 라우터 적용
router.use('/api', api.routes());

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(port, () => {
    console.log(`port : ${port}`);
});
