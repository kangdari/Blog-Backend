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

### 데이터 삭제 및 수정

● mongooes 데이터 삭제 함수 

>remove(): 특정 조건을 만족하는 데이터를 모두 삭제

>findByIdAndRemove(): id를 찾아서 삭제

>findOneAndRemove(): 특정 조건을 만족하는 데이터를 하나를 찾아서 삭제

● mongooes 데이터 업데이트 함수

>findByIdAndUpdate(id, update 내용, 업데이트 옵션): id를 찾아 업데이트

* * *

### 요청 검증

● ObjectId 검증

서버에 잘못된 id를 전달했다면 클라이언트가 요청을 잘못 보낸 것이니 400 Bad Request 오류를
띄워주어야 합니다. 그러기 위해서는 id 값이 올바른 ObjectId인지 확인해야 합니다.

id를 검증해야 하는 API는 read, remove, update 세 가지입니다.

```{.javascript}
import mongooes from 'mongoose';

const { ObjectId } = mongooes.Types;
ObjectId.isValid(id);
```

● Request Body 검증

write, update API에서 전달받은 요청 내용에 대한 검증을 해줘야 합니다.

포스트를 작성할 때 title, body, tags 값을 모두 서버에 전달해줘야 합니다. 만약 클라이언트가 값을 빼먹었을 때는
400 오류가 발생해야 합니다. 객체를 검증하는 방법은 if문으로 가능하지만 Joi 라이브러리를 사용하겠습니다.

$ yarn add joi

[Joi 라이브러리 사용법](https://hapi.dev/family/joi/)

* * *

### 페이지네이션 구현

1. 가짜 데이터 생성

2. 포스트를 역순으로 불러오기

>역순으로 불러와야 가장 최근 포스트를 먼저 보여줌.

>sort({ _id: -1}) // 내림차순 정렬, sort({ _id: 1}) // 오름차순 정렬

3. 보이는 개수 제한

>개수를 제한할 때는 limit() 함수 사용하고 파라미터에 제한할 숫자를 넣으면 됨.

4. 페이지 기능 구현

>list()함수를 사용하고 skip()함수를 사용합니다. 파라미터에 10을 넣으면 처음 10개를 제외하고 그 다음 데이터를 불러옴.

>localhost:4000/api/posts?page=2 

5. 마지막 페이지 번호 알려주기

>커스텀 헤더 설정 방법

6. 내용 길이 제한 
>body의 길이를 정해진 범위 만큼 보이도록 하겠습니다. find()를 통해 조회한 데이터는 mongooes 문서 인스턴스 형태이므로
데이터를 바로 변형할 수 없습니다. toJSON() 함수를 사용하여 JSON 형태로 변환 뒤 작업을 해주어야 합니다.

>또 다른 방법으로는 데이터를 조회할 때 lean() 함수를 사용하면 JSON 형태로 변환할 필요 없이 바로 JSON 형태로 조회가 가능합니다.

* * *

### JWT(JSON Web Token)

데이터가 JSON으로 이루어진 토큰

JWT를 이용하여 서버에 회원 인증 시스템 구현. 토큰 기반 인증 시스템 사용.


### User 스키마 / 모델 만들기

사용자 스키마에는 계정명과 비밀번호가 필요합니다. 비밀번호는 단방향 해싱 함수인 bcrypt 라이브러리를 사용하여
안전하게 저장하겠습니다.

$ yarn add bcrypt

화살표 함수는 this에 접근 불가. this에 접근하기 위해서 function 키워드 사용

스태틱 메서드에서 this는 모델을 가리킴.

* * *

### 회원 인증 API 만들기

● 인스턴스 함수
> 모델을 통해 만든 문서 인스턴스에서 사용할 수 있는 함수

● 스태틱 함수 
> 모델에서 바로 사용할 수 있는 함수

1. 회원 가입(register)

> Joi 라이브러리 사용해 Request.body 검증 > username 중복 확인 > 모델 객체 생성 > 비밀번호 설정 > DB에 저장 > 응답 데이터에서 hashedPassword 필드 제거

2. 로그인 구현

> username, password 입력 되었는지 확인 > username 존재 여부 확인 > password 확인 > 응답 데이터에서 hashedPassword 필드 제거

* * *

### 토큰 발급 및 검증

클라이언트에서 사용자 로그인 정보를 지니고 있을 수 있도록 서버에서 토큰을 발급해 주겠습니다. JWT 토큰을 만들기 위해 jsonwebtoken 모듈 설치

$ yarn add jsonwebtoken

1. 비밀키 설정하기

>.env 파일에서 JWT_SECRET 값을 설정해줍니다. Windows에서는 아무 문자열이나 직접 입력해도됩니다. 이 비밀키는 JWT 토큰의 서명을 만드는 과정에서 사용되며 절대 외부에 공개되면 안됩니다.

2. 토큰 발급하기

```{.javascript}
const token = jwt.sign(
  // 첫 번째 파라미터에는 토큰 안에 집어 넣고 싶은 데이터를 넣음.
  {
      _id: ...,
      username: ...,
  },
  process.env.JWT_SECRET, // 두 번째 파라미터는 JWT 비밀키를 넣음.
  {
      expiresIn: '7d', // 7일 동안 유효함.
  },
);
```

회원가입, 로그인 성공 시 토큰을 사용자에게 전달해 줍니다. 사용자가 브라우저에 토큰을 저장하는 방법은 주로 두 가지 방법을 사용합니다.

● 브라우저의 localStorage or sessionStorage에 담아서 사용

사용하기 매우 편리하고 구현하기 쉽지만, XXS(Cross Site Scripting)에 매우 취약함.

(페이지에 악성 스크립트를 삽입하는 것.)

보안장치를 적용해도 다른 취약점을 통해 공격받을 수 있음.

● 브라우저의 쿠키에 담아서 사용 ( 이 방법 사용)

쿠키에 담아도 같은 문제가 발생할 수 있지만 httpOnly라는 속성을 활성화하면 자바스크립트를 통해 쿠키를 조회할 수 없으므로 악성 스크립트로부터
안전합니다. 대신 CSRF(Cross Site Request Forgery)라는 공격에 취약할 수 있지만 CSRF 토큰 및 Referer 검증 등의 방식으로 방어할 수 있음.

3. 토큰 검증하기

>src/llb/jwtMiddleware.js 작성

4. 토큰 재발급하기

>jwtMiddleware.js 에서 토큰에 대한 정보를 출력했습니다. 

>iat: 토큰 생성 시간, exp: 남은 유효 기간을 나타냅니다.

>만료 날짜가 3.5일 미만이라면 토큰을 새로 재발급해주겠습니다.

5. 로그아웃 기능 구현하기

>쿠키 삭제

* * *

### posts API에 회원 인증 시스템 도입하기

기존에 구현해둔 posts API에 회원 인증 시스템을 도입하여 새 포스트는 로그인 상태에서만 작성이 가능하고 수정과 삭제는 작성자만 할 수 있도록 구현해 보겠습니다.

1. 스키마 수정
스키마에 사용자 정보를 넣어주어야 합니다. MongoDB에서는 필요한 데이터를 통채로 집어 넣습니다.

2. posts 컬렉션을 비우기

3. 로그인했을 때만 API 사용할 수 있게 하기

>checkLoggedIn 미들웨어를 만들어 로그인을 했을 때만 CRUD 기능을 사용할 수 있도록 합니다. posts 라우터에 이 미들웨어 적용

4. 포스트 작성 시 사용자 정보 넣기

5. 포스트 수정 및 삭제 시 권한 확인하기

> 기존에 만들었던 posts.ctrl.js의 checkObjectId를 getPostById 미들웨어로 변경, id로 찾은 포스트를 ctx.state에 담아 줌.

> checkOwnPost 미들웨어 작성, id로 찾은 포스트가 로그인 중인 사용자가 작성한 포스트인지 확인. 사용자의 포스트가 아니라면 403 에러

* * *

### username/tags로 포스트 필터링

특정 사용자가 작성한 포스트만 조회하거나 특정 태그가 있는 포스트만 조회하는 기능


## blog-frontend

  ## HTML 필터링하기

  현재 posts 목록 출력 시 HTML 태그가 그대로 보임. 이 태그를 없애기 위해서 서버 쪽에서 태그를 없애는 작업 추가

  HTML을 제거하는 기능뿐만 아니라 특정 HTML만을 허용하는 기능이 있어 악성 스크립트 삽입을 막을 수 있다.

  백엔드 프로젝트에서 sanitize-html 라이브러리 설치

  $ yarn add sanitize-html // sanitize-html 라이브러리를 사용하여 HTML 필터링

  백엔드 프로젝트 posts.ctrl.js 수정

  list, write, update 3개의 함수 수정

  list 함수에서는 sanitizeHtml 함수를 사용하여 HTML을 제거하고 문자열의 길이를 제한하는 함수를 작성하고 적용

  write 함수에서는 HTML의 특정 태그와 특정 속성만을 허용하는 객체를 적용하여 HTML 필터링

  update 함수에서는 수정된 내용의 객체를 복사하여 sanitizeHtml 함수를 사용해 HTML 제거


## 프로젝트 마무리

  ● 클라이언트에서 프로젝트 빌드 후

  ● koa-static으로 정적 파일 제공

  서버를 통해 blog-fronted/build 디렉터리 안의 파일을 사용할 수 있도록 koa-static을 사용하여 정적 파일 

  제공 기능 구현. 서버 프로적트(blog-backend)에서 koa-static 설치

  $ yarn add koa-static

  src/index.js 수정 > 오류 해결 > 서버 실행 후 http://localhost:4000/ 로 접속


## 오류 해결

  The ESM module loader is experimental

  ...

  ReferenceError: __dirname is not defined

  No require, exports, module.exports, __filename, __dirname 과 같은 Command Js는 ES 모듈에서 사용이 불가능하여 

  위와 같은 오류가 발생합니다.

  이를 해결하기 위해 아래와 같은 방법을 이용하여 __filename, __dirname와 같은 변수를 동일하게 만들어 사용하여 
  
  오류를 해결했습니다.

  ```{.javascript}
    import { fileURLToPath } from 'url';
    import { dirname } from 'path';

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
  ```

  [ECMAScript Modules](https://nodejs.org/api/esm.html#esm_no_require_exports_module_exports_filename_dirname)


  __dirname : 현재 실행되고 있는 모듈의 디렉토리 이름

  __filename : 현재 실행되고 있는 파일의 이름

  [Node Modules](https://nodejs.org/docs/latest/api/modules.html#modules_dirname)
