import express from 'express';

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from '../middlewares/auth.js';
// controllers
import { create, update, remove, list } from '../controllers/category.js';

router.post('/category', requireSignin, isAdmin, create);
router.put('/category', requireSignin, isAdmin, update);
router.delete('/category/:categoryId', requireSignin, isAdmin, remove);
router.get('/categories', list);

export default router;