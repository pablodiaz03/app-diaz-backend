import ProductManager from '../../ProductManager.js';
import { Router } from 'express';

const productManager = new ProductManager();
await productManager.getProducts();

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
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
        //console.log('No se pudo leer los productos');
        res.status(400).send({ status: 'error', error: 'No se pudo leer los productos' });
    }
});

productsRouter.get('/:pid', async (req, res) => {
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

productsRouter.post('/', async (req, res) => {
    let product = req.body;
    await productManager.addProduct(product);
    res.send(product);
});

productsRouter.put('/:pid', async (req, res) => {
    let pid = req.params.pid;
    let product = req.body;
    try {
        if (!pid) {
            //console.log('No se envio el PID');
            res.status(400).send({ status: 'error', error: 'No se envio el PID' })
        }
        else {
            if (pid != product.id) {
                res.status(400).send({ status: 'error', error: 'El ID enviado por parámetro no coincide con el ID del producto' })
            } else {
                await productManager.updateProduct(product);
                res.send(product);
            }

        }
    } catch (error) {
        //console.log('No se pudo leer los productos');
        res.status(400).send({ status: 'error', error: 'No se pudo leer los productos' })
    }
});

productsRouter.delete('/:pid', async (req, res) => {
    try {
        let pid = req.params.pid;
        if (!pid) {
            //console.log('No se envio el PID');
            res.status(400).send({ status: 'error', error: 'No se envio el PID' })
        }
        else {
            await productManager.deleteProduct(pid);
            res.send();
        }
    } catch (error) {
        //console.log('No se pudo leer los productos');
        res.status(400).send({ status: 'error', error: 'No se pudo leer los productos' })
    }
});

// Exporto la ruta
export { productsRouter };