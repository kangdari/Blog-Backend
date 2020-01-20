const checkLoggedIn = (ctx, next) => {
    // 로그인 한 유저가 없다면
    if (!ctx.state.user) {
        ctx.status = 401; // Unauthorized
        return;
    }
    return next();
};

export default checkLoggedIn;
