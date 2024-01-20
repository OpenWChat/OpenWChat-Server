var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserModel } from '../models/index.js';
export const findUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel.findById(userId);
    if (!user)
        return { message: 'Please fill all fields.' };
    return user;
});
export const searchUsers = (keyword, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserModel.find({
        $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { email: { $regex: keyword, $options: 'i' } },
        ],
    }).find({
        _id: { $ne: userId },
    });
    return users;
});
//# sourceMappingURL=user.service.js.map