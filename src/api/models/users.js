import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

// 스키마 생성
const UserSchema = new Schema({
    username: String,
    hashedPassword: String,
});

// 인스턴스 함수 : 모델을 통해 만든 문서 인스턴스에서 사용할 수 있는 함수
UserSchema.methods.setPassword = async function(password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
};
UserSchema.methods.checkPassword = async function(password) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result; // true or false
};
UserSchema.methods.serialize = function() {
    const data = this.toJSON(); // this는 모델
    delete data.hashedPassword;
    return data;
};
UserSchema.methods.generateToken = function() {
    const token = jwt.sign(
        // 첫 번째 파라미터에는 토큰 안에 넣고싶은 데이터
        {
            _id: this.id,
            username: this.username,
        },
        process.env.JWT_SECRET, // 두 번째 파라미터에는 JWT 암호를 넣음.
        {
            expiresIn: '7d', // 7일 유효
        },
    );
    return token;
};

// 스태틱 함수 : 모델에서 바로 사용할 수 있는 함수
// username으로 데이터 찾기
UserSchema.statics.findByUsername = function(username) {
    return this.findOne({ username }); // this는 모델을 가리킴. User
};

// 모델 생성 (스키마 이름, 스키마 객체)
const User = mongoose.model('User', UserSchema);

export default User;
