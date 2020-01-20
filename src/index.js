import dotenv from 'dotenv';
import Koa from 'koa';
import Router from 'koa-Router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
// import createFakeData from './createFakeData.js'

// api 모듈 불러옴
import api from './api/index.js';
import jwtMiddleware from './lib/jwtMiddleware.js'

dotenv.config();
// 비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 생성
const { PORT, MONGO_URL } = process.env;

mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
        // createFakeData();
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
app.use(jwtMiddleware);

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(port, () => {
    console.log(`port : ${port}`);
});
