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
            username
        })
        // hash 값으로 변경된 password를 user 인스턴스에 적용
        user.setPassword(password);
        user.save(); // DB 저장

        // 응답할 데이터에서 hashedPassword 필드 제거
        ctx.body = user.serialize();
    }catch(e) {
        ctx.throw(500, e);
    }
};

// 로그인
export const login = ctx => {};

// 로그인 상태 확인
export const checkLogin = ctx => {};

// 로그아웃
export const logout = ctx => {};
