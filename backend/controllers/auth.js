import User from '../models/user.js';

export const register = async(req, res) => {
    try {
        const user = await User(req.body).save();
        res.json(user);
    } catch (err) {
        console.log(err);
    }
};