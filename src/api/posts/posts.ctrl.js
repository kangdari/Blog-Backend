let postId = 1;

const posts = [
    {
        id: 1,
        title: '제목',
        body: '내용',
    },
];

// 포스트 작성
// POST /api/posts/
export const write = ctx => {
    // REST API의 Request는 ctx.request.body에서 조회 가능
    const { title, body } = ctx.request.body;
    postId += 1;
    const post = { id: postId, title, body };
    posts.push(post);
    ctx.body = post;
};

// 포스트 목록 조회
// GET /api/posts/
export const list = ctx => {
    ctx.body = posts;
};

// 특정 포스트 조회
// GET /api/posts/:id
export const read = ctx => {
    const { id } = ctx.params;
    // 주어진 id 값으로 posts 배열에서 찾아내야 함.
    // params에서 가져온 id 값은 string
    const post = posts.find(post => post.id.toString() === id);

    if (!post) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 없습니다.',
        };
        return;
    }
    ctx.body = post;
};

// 특정 포스트 제거
// DELETE /api/posts/:id
export const remove = ctx => {
    const { id } = ctx.params;
    // 삭제할 post의 index 값 찾기
    const index = posts.findIndex(post => post.id.toString() === id);
    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 없습니다.',
        };
        return;
    }
    posts.splice(index, 1);
    ctx.status = 204; // No Connect
};

// 특정 포스트 부분 수정
// PATCH /api/posts/:id
export const update = ctx =>{
    const { id } = ctx.params;
    const index = posts.findIndex(post => post.id.toString() === id);
    if(index === -1){
        ctx.status = 404;
        ctx.body = {
            message: 'post 없음'
        }
        return;
    }
    posts[index] = {
        ...posts[index],
        ...ctx.request.body
    };
    ctx.body = posts[index];
}