import Carts from '../../Carts.js';
import { Router } from 'express';

const carts = new Carts();
await carts.getCarts();

const cartsRouter = Router();

cartsRouter.post('/', async (req, res) => {
    //let cart = req.body;
    let cart = await carts.addCart();
    res.send(cart);
});

cartsRouter.get('/:cid', async (req, res) => {
    try {
        let cid = req.params.cid;

        let cart = await carts.getCartByID(cid);

        if (!cid) {
            console.log('No se envio el CID');
        }
        else {
            res.send(cart);
        }
    } catch (error) {
        console.log('No se pudo leer los productos del Carrito');
    }
});

/**
 * Agrega un producto al carrito
 */
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let quantity = 1;

    try {
        if (!cid || !pid) {
            res.status(400).send({ status: 'error', error: 'Falta enviar datos' })
        }
        else {
            await carts.addItemCart(cid, pid, quantity);
            res.send();
        }
    } catch (error) {
        res.status(400).send({ status: 'error', error: 'No se pudo agregar el producto al carrito' })
    }
});

cartsRouter.delete('/:cid/product/:pid', async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;

    try {
        if (!cid || !pid) {
            res.status(400).send({ status: 'error', error: 'Falta enviar datos' })
        }
        else {
            await carts.deleteItemCart(cid, pid);
            res.send();
        }
    } catch (error) {
        res.status(400).send({ status: 'error', error: 'No se pudo eliminar el producto del carrito' })
    }
});

// Exporto la ruta
export { cartsRouter };