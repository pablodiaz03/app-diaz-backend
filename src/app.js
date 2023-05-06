import express from 'express';
import ProductManager from '../ProductManager.js';

const app = express();
const productManager = new ProductManager();

app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
    try {
        let limit = req.query.limit;

        let products = await productManager.getProducts();

        if (!limit) {
            res.send(products);
        }
        else {
            let productsFiltrados = products.filter(product => product.id <= limit);
            res.send(productsFiltrados);
        }
    } catch (error) {
        console.log('No se pudo leer los productos');
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        let pid = req.params.pid;

        let product = await productManager.getProductByID(pid);

        if (!pid) {
            console.log('No se envio el PID');
        }
        else {
            res.send(product);
        }
    } catch (error) {
        console.log('No se pudo leer los productos');
    }
});

app.listen(8080, () => {
    console.log('Esta escuchando el 8080');
});

