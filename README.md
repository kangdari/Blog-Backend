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

### MongoDB

서버 개발 시 DB를 사용하면 웹 서비스에서 사용되는 데이터들을 저장하고, 효율적으로 조회, 수정이 가능하다.

기존에는 MySQL, OracleDB 등 같은 RDBMS(관계형 데이터베이스)를 자주 사용했다.

관계형 데이터베이스는 몇 가지 한계가 있다.

● 데이터 스키마가 고정적 

새로 등록한 데이터 형식이 기존에 있던 데이터들과 다르다면 기존 데이터를 모두 수정해야 새로운 데이터 등록이 가능하다.
데이터의 양이 많아질수록 스키마를 변경하는 작업은 매우 번거롭다.

● 확장성 문제

RDBMS는 저장하고 처리해야 할 데이터의 양이 늘어나면 여러 컴퓨터로 분산시키는 것이 아니라, 해당 DB 서버의 성능을 
업그레이드하는 방식으로 확장해주어야 한다.


MongoDB는 이런 한계를 극복한 문서 지향적 NoSQL DB이다.

새로 등록해야 할 데이터의 형식이 바뀐다고 하더라고 기존 데이터까지 수정할 필요가 없다.

서버의 데이터 양이 늘어나도 한 컴퓨터에서만 처리하는 것이 아니라 여러 컴퓨터로 분산하여 처리할 수 있도록 확장하기 쉽게 설계되어있다.

● 컬렉션 : 여러 문서가 들어 있는 곳

MongoDB는 다른 스키마를 가지고 있는 문서들이 한 컬렉션에 공존할 수 있음.

● MongoDB 구조

서버 하나에 여러 개의 DB를 가지고 있을 수 있으며, 각 데이터베이스에는 여러 개의 컬렉션이 있고, 컬렉션 내부에는 문서들이 들어 있습니다.

● mongoose 설치 및 적용

mongoose는 Node.js 환경에서 사용하는 MongoDB 기반 ODM 라이브러리.

$ yarn add mongoose dotenv

* * *

### Node.js에서 ES 모듈 import / export 문법 사용

기존에 리액트 프로젝트에서 사용해 오던 ES 모듈 import/export 문법이 Node.js v12부터 정식으로 지원됩니다.

1. package.json에서 "type": "module" 추가해줍니다. ( 저는 v13.6.0 사용했습니다. )

2. require/module.exports 구문들을 import/export 구문으로 모두 변경해줍니다.

3. module을 import 하는 과정에서 .js 확장자까지 포함해주어야 오류가 발생하지 않습니다.

4. src/index.js 파일 맨 위에 require('dotenv').config(); 문구를 작성했었습니다. config() 함수를 호출해야
process.env 값을 조회할 수 있습니다. 하지만 ReferenceError: require is not defined 오류가 발생하여 수정했습니다.

```{.javascript}
import dotenv from 'dotenv';
(...)
dotenv.config(); // config() 함수 호출
(...)
```

5. yarn start / yarn start:dev 서버 실행

6. 자동 완성을 통해 모듈 불러오기, 루트 디렉토리에 jsconfig.json 작성

```{.javascript}
{
    "compilerOptions": {
        "target": "es6",
        "module": "es2015"
    },
    "include": ["src/**/*"]
}
```

* * *

### mongooes의 schema 와 model

● schema(스키마) : 컬렉션에 들어가는 문서 내부의 각 필드가 어떤 형식으로 되어 있는지 정의하는 객체

● model(모델) : 스키마를 사용하여 만드는 인스턴스로, 데이터베이스에서 실제 작업을 처리할 수 있는 함수들을 지니고 있는 객체

* * *

### MongoDB Compass 설치 및 사용

* * *

### 데이터 생성 및 조회

● mongooes 데이터 생성

>save() 함수를 실행시켜야 DB에 저장됨.

● mongooes 데이터 조회

>모델 인스턴스의 find() 함수를 호출 후 exec()를 붙여줘야 서버에 쿼리 요청

>특정 포스트 조회 시 findById() 함수 사용



