var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createUser, signUser } from '../services/auth.service.js';
import { generateToken, verifyToken } from '../services/token.service.js';
import { findUser } from '../services/user.service.js';
export const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { name, email, picture, status, password } = req.body;
        const newUser = yield createUser({
            name,
            email,
            picture,
            status,
            password,
        });
        if (typeof newUser === 'string') {
            return res.status(400).json({ message: newUser });
        }
        const access_token = yield generateToken({ userId: String(newUser._id) }, '1d', (_a = process.env.ACCESS_TOKEN_SECRET) !== null && _a !== void 0 ? _a : '');
        const refresh_token = yield generateToken({ userId: newUser._id }, '30d', (_b = process.env.REFRESH_TOKEN_SECRET) !== null && _b !== void 0 ? _b : '');
        res.cookie('refreshtoken', refresh_token, {
            httpOnly: true,
            path: '/api/v1/auth/refreshtoken',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.json({
            message: 'register success.',
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                picture: newUser.picture,
                status: newUser.status,
                token: access_token,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
export const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const { email, password } = req.body;
        const user = yield signUser(email, password);
        if (typeof user === 'string') {
            return res.status(400).json({ message: user });
        }
        const access_token = yield generateToken({ userId: user._id }, '1d', (_c = process.env.ACCESS_TOKEN_SECRET) !== null && _c !== void 0 ? _c : '');
        const refresh_token = yield generateToken({ userId: user._id }, '30d', (_d = process.env.REFRESH_TOKEN_SECRET) !== null && _d !== void 0 ? _d : '');
        res.cookie('refreshtoken', refresh_token, {
            httpOnly: true,
            path: '/api/v1/auth/refreshtoken',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.json({
            message: 'register success.',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                status: user.status,
                token: access_token,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
export const logout = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('refreshtoken', { path: '/api/v1/auth/refreshtoken' });
        res.json({
            message: 'logged out!',
        });
    }
    catch (error) {
        next(error);
    }
});
export const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    try {
        const refresh_token = req.cookies.refreshtoken;
        if (!refresh_token)
            return res.status(401).json({
                message: 'Please login.',
            });
        const check = yield verifyToken(refresh_token, (_e = process.env.REFRESH_TOKEN_SECRET) !== null && _e !== void 0 ? _e : '');
        const user = (yield findUser(check.userId));
        const access_token = yield generateToken({ userId: user._id }, '1d', (_f = process.env.ACCESS_TOKEN_SECRET) !== null && _f !== void 0 ? _f : '');
        res.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                status: user.status,
                token: access_token,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=auth.controller.js.map