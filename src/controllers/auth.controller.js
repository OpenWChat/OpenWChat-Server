export const register = async (req, res, next) => {
    try {
        const { name, email, picture, status, password } = req.body;
        console.log(req.body);
        return res.status(200).json({s:"s"})
    } catch (error) {
        next(error);
    }
};

export const login = async (_req, _res, next) => {
    try {
        0;
    } catch (error) {
        next(error);
    }
};

export const logout = async (_req, _res, next) => {
    try {
        0;
    } catch (error) {
        next(error);
    }
};

export const refreshToken = async (_req, _res, next) => {
    try {
        0;
    } catch (error) {
        next(error);
    }
};
