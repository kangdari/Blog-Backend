import Joi from 'joi';
import User from '../models/users.js';

// 회원 가입
// POST /api/auth/register
// username, password
export const register = async ctx => {
    // Request Body 검증
    const schema = Joi.object().keys({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(10)
            .required(),
        password: Joi.string().required(),
    });
    const result = Joi.validate(ctx.request.body, schema);
    if (result.error) {
        ctx.status = 400; // Bad Request
        ctx.body = result.error;
        return;
    }

    const { username, password } = ctx.request.body;
    try {
        // username이 중복 여부 체크
        const exists = await User.findByUsername(username); // ture or false
        if (exists) {
            ctx.status = 409; // Confilct
            return;
        }
        // user 모델 인스턴스 생성
        const user = new User({
            username,
        });
        // hash 값으로 변경된 password를 user 인스턴스에 적용
        await user.setPassword(password);
        await user.save(); // DB 저장

        // 응답할 데이터에서 hashedPassword 필드 제거
        ctx.body = user.serialize();

        // 토큰 생성
        const token = user.generateToken();
        // 쿠키 생성
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 일
            httpOnly: true, // JS를 통해 쿠키 조회 못함.
        });
    } catch (e) {
        ctx.throw(500, e);
    }
};

// 로그인
// POST /api/auth/login
export const login = async ctx => {
    const { username, password } = ctx.request.body;

    // 입력한 useranme, password가 없을 경우
    if (!username || !password) {
        ctx.status = 401; // Unauthorized
        return;
    }

    try {
        // user가 존재하는지 체크
        const user = await User.findByUsername(username); // true or false
        if (!user) {
            ctx.status = 401; // Unauthorized
            return;
        }
        // 입력한 password와 user 모델 인스턴스의 hashedPassword 비교
        const valid = await user.checkPassword(password); // ture or false
        if (!valid) {
            ctx.status = 401;
            return;
        }
        // 응답할 데이터에서 hashedPassword 필드 제거
        ctx.body = user.serialize();

        // 토큰 생성
        const token = user.generateToken();
        // 쿠키 생성
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 일
            httpOnly: true, // JS를 통해 쿠키 조회 못함.
        });
    } catch (e) {
        ctx.throw(500, e);
    }
};

// 로그인 상태 확인
export const checkLogin = async ctx => {
    const { user } = ctx.state;
    if (!user) {
        // 로그인 중 아님
        ctx.status = 401; // Unauthorized
        return;
    }
    ctx.body = user;
};

// 로그아웃
// POST /api/auth/logout
export const logout = ctx => {
    ctx.cookies.set('access_token'); // 기존 쿠키를 지움
    ctx.status = 204; // No Connect
};
