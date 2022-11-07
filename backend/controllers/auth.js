import User from '../models/user.js';
import { hashPassword, comparePassword } from '../helpers/auth.js';


// antes de guardar un usuario en la base de datos hay que :
// -añadir validacion 
// -ver si el mail ya existe
// -encriptar(hash) la contraseña
// registrar usuario
// send response

export const register = async(req, res) => {
    try {
        // destructure name, email, password from req.body
        const { name, email, password } = req.body;
        // validate
        if (!name.trim()) {
            return res.json({ error: 'Nombre es requerido' });
        }
        if (!email) {
            return res.json({ error: 'Email ya usado' });
        }
        if (!password || password.length < 6) {
            return res.json({ error: 'Password debe tener al menos 6 caracteres' });
        }
        //chequar si el mail ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ error: 'Email ya usado' });
        }
        // hash password
        const hashedPassword = await hashPassword(password);
        // register user
        const user = await new User({ name, email, password: hashedPassword }).save();
        // send response
        res.json(user);


    } catch (err) {
        console.log(err);
    }
};