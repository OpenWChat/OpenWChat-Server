var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import validator from 'validator';
import { UserModel } from '../models/index.js';
import bcrypt from 'bcrypt';
const { DEFAULT_PICTURE, DEFAULT_STATUS } = process.env;
export const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, picture, status, password } = userData;
    if (!name || !email || !password) {
        return 'Please fill all fields.';
    }
    if (!validator.isLength(name, {
        min: 2,
        max: 25,
    })) {
        return 'Plase make sure your name is between 2 and 16 characters.';
    }
    if (status && status.length > 64) {
        return 'Please make sure your status is less than 64 characters.';
    }
    if (!validator.isEmail(email)) {
        return 'Please make sure to provide a valid email address.';
    }
    const checkDb = yield UserModel.findOne({ email });
    if (checkDb) {
        return 'Please try again with a different email address, this email already exist.';
    }
    if (!validator.isLength(password, {
        min: 6,
        max: 128,
    })) {
        return 'Please make sure your password is between 6 and 128 characters.';
    }
    const saltRounds = 10;
    const hashedPass = yield bcrypt.hash(password, saltRounds);
    const user = yield new UserModel({
        name,
        email,
        picture: picture || DEFAULT_PICTURE,
        status: status || DEFAULT_STATUS,
        password: hashedPass,
    }).save();
    return user;
});
export const signUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel.findOne({ email: email.toLowerCase() }).lean();
    if (!user)
        return 'Invalid credentials.';
    let passwordMatches = yield bcrypt.compare(password, user.password);
    if (!passwordMatches)
        return 'Invalid credentials.';
    return user;
});
//# sourceMappingURL=auth.service.js.map