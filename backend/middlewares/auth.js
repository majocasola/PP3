import jwt from "jsonwebtoken";

// 401 no autorizado
export const requireSignin = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization,
            process.env.JWT_SECRET);

        req.user = decoded;
        next();

    } catch (err) {
        return res.status(401).json(err);
    }
};