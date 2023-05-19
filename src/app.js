import express from 'express';
import { productsRouter } from './routers/products.router.js';
import { cartsRouter } from './routers/carts.router.js';
import handlerbars from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './routers/views.router.js';

const app = express();

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
io.on('connection', (socket) => {
    console.log('Socket connection');
    // Envio los mensajes al cliente que se conectó
    // socket.emit('messages', messages);

    // Escucho los mensajes enviado por el cliente y se los propago a todos
    socket.on('message', (data) => {
        console.log(data);
        // Agrego el mensaje al array de mensajes
        // Propago el evento a todos los clientes conectados
        // io.emit('messages', messages);
    });
});


