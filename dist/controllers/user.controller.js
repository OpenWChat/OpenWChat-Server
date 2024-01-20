var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { searchUsers as searchUsersService } from '../services/user.service.js';
export const searchUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const keyword = req.query.search;
        if (!keyword) {
            console.error('Please add a search query first');
            return res.status(400).json({
                message: 'Oops...Something went wrong !',
            });
        }
        const users = yield searchUsersService(keyword, req.user.userId);
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=user.controller.js.map