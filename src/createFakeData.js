import Post from './api/models/posts.js';

export default function createFakeData() {
    const posts = [...Array(40).keys()].map(index => ({
        title: `post ${index}`,
        body: '가짜 데이터',
        tags: ['가짜', '데이터'],
    }));
    Post.insertMany(posts, (err, doc) => {
        console.log(doc);
    });
}
