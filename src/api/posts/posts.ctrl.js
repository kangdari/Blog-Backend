import Post from '../models/posts.js';
import mongoose from 'mongoose';
import Joi from 'joi';

const { ObjectId } = mongoose.Types;

// ObjectId 검증을 위한 미들웨어
export const getPostById = async (ctx, next) => {
    const { id } = ctx.params;
    // id가 유효하지 않을 경우
    if (!ObjectId.isValid(id)) {
        ctx.status = 400; // Bad Request
        return;
    }
    try{
        const post = await Post.findById(id);
        // 포스트가 존재 하지 않을 떄
        if(!post){
            ctx.status = 404; // Not Found
            return;
        }
        ctx.state.post = post;
        return next();
    }catch(e) {
        ctx.throw(500, e);
    }
    return next();
};

// id로 찾은 포스트가 로그인 중인 사용자가 작성한 포스트인지 확인 하는 미들웨어
export const checkOwnPost = (ctx, next) =>{
    const { user, post } = ctx.state;
    if(post.user._id.toString() !== user._id){
        ctx.status = 403; // Forbidden
        return
    }
    return next();
}

// 포스트 작성
// POST /api/posts/
export const write = async ctx => {
    // Request Body 검증
    const schema = Joi.object().keys({
        // 객체는 다음 필드를 가져야 함.
        title: Joi.string().required(), // required() 필수 요소
        body: Joi.string().required(),
        tags: Joi.array()
            .items(Joi.string())
            .required(), // 문자열 배열
    });

    // 검증 후 검증 실패인 경우 에러 처리
    // 입력한 값과 schema의 필드 형식이 같은지 검증
    const result = Joi.validate(ctx.request.body, schema);
    if (result.error) {
        ctx.status = 400; // Bad Request
        ctx.body = result.error;
        return;
    }

    const { title, body, tags } = ctx.request.body;
    const post = new Post({
        title,
        body,
        tags,
        user: ctx.state.user,
    });
    try {
        // DB에 저장
        await post.save();
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e); // 서버 에러
    }
};

// 포스트 목록 조회
// GET /api/posts/
export const list = async ctx => {
    // query는 문자열이므로 숫자형으로 변환
    // 기본값은 1로 설정
    // 10진수
    const page = parseInt(ctx.query.page || '1', 10);

    try {
        // 모델 인스턴스의 find() 함수롤 데이터 조회
        // exec() 를 붙여줘야 서버에 쿼리 요청
        const posts = await Post.find()
            .sort({ _id: -1 }) // 내림차순
            .limit(10) // 한 번에 보이는 개수를 제한
            .skip((page - 1) * 10) // 파라미터 개수 만큼 제외하고 다음 데이터부터 보여줌.
            .exec();
        // 커스텀 헤더 작성, HTTP 헤더 작성
        const postCount = await Post.countDocuments().exec();
        ctx.set('Last-Page', Math.ceil(postCount / 10));
        // ctx.body = posts;
        // 내용 길이 제한
        ctx.body = posts
            .map(post => (post = post.toJSON()))
            .map(post => ({
                ...post,
                body:
                    post.body.length < 200
                        ? post.body
                        : `${post.body.slice(0, 200)}...`,
            }));
    } catch (e) {
        ctx.throw(500, e);
    }
};

// 특정 포스트 조회
// GET /api/posts/:id
export const read = async ctx => {
    ctx.body = ctx.state.post;
};

// 특정 포스트 제거
// DELETE /api/posts/:id
export const remove = async ctx => {
    const { id } = ctx.params;
    try {
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204; // No Connect 성공했지만 응답할 데이터 없음.
    } catch (e) {
        ctx.throw(500, e);
    }
};

// 특정 포스트 부분 수정
// PATCH /api/posts/:id
export const update = async ctx => {
    const schema = Joi.object().keys({
        title: Joi.string(),
        body: Joi.string(),
        tags: Joi.array().items(Joi.string()),
    });

    const result = Joi.validate(ctx.request.body, schema);
    if (result.error) {
        ctx.status = 400; // Bad Request;
        ctx.body = result.error;
        return;
    }

    const { id } = ctx.params;
    try {
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            new: true, // 이 값을 설정하면 업데이트된 데이터를 반환
            // false일 때는 업데이트되기 전의 데이터를 반환
        }).exec();
        if (!post) {
            ctx.status = 404; // Not Found
            return;
        }
        ctx.body = post;
    } catch (e) {
        ctx.throw(500, e);
    }
};
