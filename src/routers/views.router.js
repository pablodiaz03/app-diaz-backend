import { Router } from 'express';
import ProductController from '../../ProductManager.js';

const viewsRouter = Router();
const productController = new ProductController();

viewsRouter.get('/', async (req, res) => {
    const products = await productController.getProducts();
    const cant = products.length;

    res.render('home', { products, cant });
});

viewsRouter.get('/realtimeproducts', async (req, res) => {
    const products = await productController.getProducts();
    const cant = products.length;

    res.render('realtimeproducts');
});


export default viewsRouter;