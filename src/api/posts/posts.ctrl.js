import Post from '../models/posts.js';

// 포스트 작성
// POST /api/posts/
export const write = async ctx => {
    const { title, body, tags } = ctx.request.body;
    const post = new Post({
        title,
        body,
        tags
    })
    try{
        // DB에 저장
        await post.save();
        ctx.body = post;    
    }catch(e) {
        ctx.throw(500, e); // 서버 에러
    }
};

// 포스트 목록 조회
// GET /api/posts/
export const list = async ctx => {
    try{
        // 모델 인스턴스의 find() 함수롤 데이터 조회
        // exec() 를 붙여줘야 서버에 쿼리 요청
        const posts = await Post.find().exec();
        ctx.body = posts;
    }catch(e) {
        ctx.throw(500, e);
    }
};

// 특정 포스트 조회
// GET /api/posts/:id
export const read = async ctx => {
    const { id } = ctx.params;
    try{
        // id 값을 가진 데이터를 조회 시 findById() 함수 사용
        const post = await Post.findById(id).exec();
        if(!post){
            ctx.status = 404; // Not Found
            return;
        }
        ctx.body = post;
    }catch(e) {
        ctx.throw(500, e);
    }
};

// 특정 포스트 제거
// DELETE /api/posts/:id
export const remove = async ctx => {
    const { id } = ctx.params;
    try{
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204; // No Connect 성공했지만 응답할 데이터 없음.
    }catch(e) {
        ctx.throw(500, e);
    }
};

// 특정 포스트 부분 수정
// PATCH /api/posts/:id
export const update = async ctx => {
    const { id } = ctx.params;
    try{
        const post = await Post.findByIdAndUpdate(id, ctx.request.body,{
            new: true  // 이 값을 설정하면 업데이트된 데이터를 반환
            // false일 때는 업데이트되기 전의 데이터를 반환
        }).exec();
        if(!post){
            ctx.status = 404; // Not Found
            return;
        }
        ctx.body = post;
    }catch(e) {
        ctx.throw(500, e);
    }
};
