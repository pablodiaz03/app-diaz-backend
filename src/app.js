import express from 'express';
import { productsRouter } from './routers/products.router.js';
import { cartsRouter } from './routers/carts.router.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de products para "/api/products"
app.use('/api/products', productsRouter);
// Ruta de carts para "/api/carts"
app.use('/api/carts', cartsRouter);

app.listen(8080, () => {
    console.log('Esta escuchando el 8080');
});

