var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
export const authMiddleware = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.headers['authorization'])
        return next(createHttpError.Unauthorized());
    const bearerToken = req.headers['authorization'];
    const token = bearerToken.split(' ')[1];
    jwt.verify(token, (_a = process.env.ACCESS_TOKEN_SECRET) !== null && _a !== void 0 ? _a : '', (err, payload) => {
        if (err) {
            return next(createHttpError.Unauthorized());
        }
        req.user = payload;
        next();
    });
});
//# sourceMappingURL=authMiddleware.js.map