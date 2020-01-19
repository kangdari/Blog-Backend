import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

// 스키마 생성
const UserSchema = new Schema({
    username: String,
    hashedPassword: String,
});

UserSchema.methods.setPassword = async function(password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = has;
};

UserSchema.methods.checkPassword = async function(paswword) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result; // true or false
};

// username으로 데이터 찾기
UserSchema.statics.findByUsername = function(username){
    return this.findOne({ username }) // this는 모델을 가리킴. User
}

// 모델 생성 (스키마 이름, 스키마 객체)
const User = mongoose.model('User', UserSchema);

export default User;
