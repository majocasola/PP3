// autentificaciones
// users es el endpoint
import express from 'express';

const router = express.Router();

// middlewares
import { requireSignin } from '../middlewares/auth.js';

// controllers

import { register, login } from '../controllers/auth.js';

router.post('/register', register);
router.post('/login', login);

// testing
router.get('/secret', requireSignin, (req, res) => {
    res.json({ message: 'Tienes acceso a esta ruta secreta' });
});



export default router;