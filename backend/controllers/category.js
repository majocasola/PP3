import Category from '../models/category.js';
import slugify from 'slugify';


export const create = async(req, res) => {
    try {
        const { name } = req.body;
        if (!name.trim()) {
            return res.json({ error: 'El nombre es obligatorio' });
        }
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.json({ error: 'La categoría ya existe' });
        }

        const category = await new Category({ name, slug: slugify(name) }).save();
        res.json(category);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
};