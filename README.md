## Blog-backend
>Node.js의 Koa 프레임워크를 이용하여 백엔드 개발 실습.

### 작업 환경 준비
1. Node 설치

2. 프로젝트 생성

>$ yarn init -y // package.json 파일 생성

>$ yarn add koa // Koa 웹 프레임워크 설치

3. ESLint와 Prettier 설정

>ESLint와 Prettier 설치 후 $ yarn add --dev eslint, yarn run eslint --init

>.prettierrc 파일 작성 후 $ yarn add eslint-config-prettier
>(Prettier에서 관리하는 코드 스타일은 ESLint에서 관리하지 않도록 설정)

>eslint 규칙 추가('no-unused-var', 'no-console')

* * *

### Koa 기본 사용법

#### Koa 서버

#### 미들웨어 

Koa 애플리케이션은 미들웨어 배열로 구성. 

● app.use : 미들웨어 함수를 애플리케이션에 등록. 

미들웨어 함수 구조 

<pre><code>(ctx, next) => { }</code></pre>

● ctx : Context의 줄임말로 웹 요청과 응답에 관한 정보를 가짐.

● next : 현재 처리 중인 미들웨어의 다음 미들웨어를 호출하는 함수

next 함수는 Promise를 반환 함. next 함수 호출 이후 .then을 사용하여 Promise가 끝난 후 다른 작업 가능

koa는 async/await를 정식으로 지원함.

* * *

### nodemon 사용

nodemon을 사용하여 코드를 변경할 때마다 서버를 자동으로 재시작

$ yarn add -dev nodemon // nodemon 설치 이후 package.json에 scripts 작성

```{.javascript}
  "scripts":{
    "start": "node src",
    "start:dev": "nodemon --watch src/ src/index.js"
  }
```

* * *
### koa-router 사용

$ yarn add koa-router // koa-router 설치

라우트 파라미터를 설정 할 때는 /about/:name 형식으로 콜론(:)을 사용하여 라우터 경로 설정 

ctx.parmas 객체에서 조회 가능 

URL 쿼리의 경우, /posts/?id=3 같은 형식으로 요청했다면 ctx.query에서 조회 가능

* * *

### REST API
 
REST API를 만들어 클라이언트가 서버에 자신이 데이터를 조회, 생성, 삭제, 업데이트하겠다고 요청하면 서버는 필요한 로직에
따라 DB에 접근하여 작업을 처리함.

REST API는 요청 종류에 따라 다른 HTTP 메서드를 사용함.

[강다리 블로그 REST API](https://blog.naver.com/ksh44820/221707768338)

* * *

$ yarn add koa-bodyparser //  koa-bodyparser 미들웨어

이 미들웨어는 POST/PUT/PATCH와 같은 메서드의 Request Body에 JSON 형식으로 데이터를 넣어 주면,
이를 파싱하여 서버에서 사용할 수 있게 해줌.

* * *



