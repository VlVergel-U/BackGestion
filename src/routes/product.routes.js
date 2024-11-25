import { Router } from 'express'

import { createProduct, getProduct, getAllProducts, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const productRouter = Router()

productRouter.post("/product", createProduct);
productRouter.get("/product/:id", getProduct);
productRouter.get("/product", getAllProducts);
productRouter.put("/product/:id", updateProduct);
productRouter.delete("/product/:id", deleteProduct);

export default productRouter;