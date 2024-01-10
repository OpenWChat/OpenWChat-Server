import { searchUsers as searchUsersService } from '../services/user.service.js'
export const searchUsers = async (req, res, next) => {
    try {
        const keyword = req.query.search
        if (!keyword) {
            console.error('Please add a search query first')
            return res.status(400).json({
                message: 'Oops...Something went wrong !',
            })
        }
        const users = await searchUsersService(keyword, req.user.userId)
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}
