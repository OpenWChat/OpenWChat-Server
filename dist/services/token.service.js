var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { sign, verify } from '../utils/token.util.js';
export const generateToken = (payload, expiresIn, secret) => __awaiter(void 0, void 0, void 0, function* () {
    let token = yield sign(payload, expiresIn, secret);
    return token;
});
export const verifyToken = (token, secret) => __awaiter(void 0, void 0, void 0, function* () {
    let check = yield verify(token, secret);
    return check;
});
//# sourceMappingURL=token.service.js.map