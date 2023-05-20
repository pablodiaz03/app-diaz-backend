import express from 'express';
import { productsRouter } from './routers/products.router.js';
import { cartsRouter } from './routers/carts.router.js';
import handlerbars from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './routers/views.router.js';
import ProductController from '../ProductManager.js';

const app = express();
const productController = new ProductController();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set handlebars
app.engine('handlebars', handlerbars.engine());
app.set('views', 'views/');
app.set('view engine', 'handlebars');

// Seteo el directorio de archivos estáticos
app.use(express.static('public'));

// Rutas
app.use('/', viewsRouter);
// Ruta de products para "/api/products"
app.use('/api/products', productsRouter);
// Ruta de carts para "/api/carts"
app.use('/api/carts', cartsRouter);

// app.listen(8080, () => {
//     console.log('Esta escuchando el 8080');
// });

// Inicialización del servidor
const webServer = app.listen(8080, () => {
    console.log('Esta escuchando el 8080');
});

// Inicialización de socket.io
const io = new Server(webServer);

// Eventos de socket.io
io.on('connection', async (socket) => {
    console.log('Cliente conectado');

    // Envio los productos al cliente que se conectó
    const products = await productController.getProducts();

    socket.emit('reload', products);

    // Si alguien agrega un item se los propago a todos
    socket.on('addItem', async (product) => {
        // Agrego el producto
        await productController.addProduct(product);
        console.log(product);

        // Propago el evento a todos los clientes conectados
        const products = await productController.getProducts();
        console.log(products);
        io.emit('reload', products);
    });

    socket.on('deleteItem', async (idProduct) => {
        // Agrego el producto
        await productController.deleteProduct(idProduct);

        // Propago el evento a todos los clientes conectados
        const products = await productController.getProducts();
        console.log(products);
        io.emit('reload', products);
    });
});


