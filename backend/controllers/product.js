import Product from "../models/product.js";
import fs from "fs";
import slugify from "slugify";

export const create = async(req, res) => {
    try {
        // console.log(req.fields);
        // console.log(req.files);
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // validation
        switch (true) {
            case !name.trim():
                res.json({ error: "El nombre es requerido" });
            case !description.trim():
                res.json({ error: "La descripción es requerida" });
            case !price.trim():
                res.json({ error: "El precio es requerido" });
            case !category.trim():
                res.json({ error: "La categoría es requerida" });
            case !quantity.trim():
                res.json({ error: "La cantidad es requerida" });
            case !shipping.trim():
                res.json({ error: "El envío es requerido" });
            case photo && photo.size > 1000000:
                res.json({ error: "La imagen debe ser menor a 1MB" });
        }

        // create product
        const product = new Product({...req.fields, slug: slugify(name) });

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.json(product);

    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

export const list = async(req, res) => {
    try {
        const products = await Product.find({})
            .select("-photo")
            .limit(12)
            .sort({ createAt: -1 });

        res.json(products);
    } catch (err) {

    }
};