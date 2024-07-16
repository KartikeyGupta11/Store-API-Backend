import express from 'express';
import { getAllProducts, getAllProductsTest } from '../controllers/productControllers.js';

const productRoutes = express.Router();

productRoutes.get('/',getAllProducts);
productRoutes.get('/test',getAllProductsTest);

export default productRoutes;