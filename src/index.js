import dotenv from 'dotenv';
import Koa from 'koa';
import Router from 'koa-Router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
// import createFakeData from './createFakeData.js'

import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';

// api 모듈 불러옴
import api from './api/index.js';
import jwtMiddleware from './lib/jwtMiddleware.js';

// ESM 오류 해결을 위해 __dirname, __filename 직접 변수 작성
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

const buildDirectory = path.resolve(__dirname, '../../blog-frontend/build');
app.use(serve(buildDirectory));
console.log(buildDirectory)
app.use(async ctx => {
    // NotFound이고, 주소가 /api로 시작하지 않는 경우
    if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
        // index.html 내용을 반환
        await send(ctx, 'index.html', { root: buildDirectory });
    }
});

const port = PORT || 4000;
app.listen(port, () => {
    console.log(`port : ${port}`);
});
