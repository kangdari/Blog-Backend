const Koa = require('koa');
const Router = require('koa-Router');

const app = new Koa();
const router = new Router();

// 라우터 설정
router.get('/', ctx=> {
    ctx.body = "home"
})
router.get('/about/:name?', ctx=> {
    const { name } = ctx.params;
    // name 값의 유무에 따라 다른 결과  출력
    ctx.body = name ? `${name} 소개` : '소개';
})
router.get('/posts/', ctx =>{
    const { id } = ctx.query;
    ctx.body = id ? `포스트 ${id}` : '아이디 없음.';
})

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, ()=>{
    console.log('port 4000')
})