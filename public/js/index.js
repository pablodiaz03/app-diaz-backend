// Inicializamos el socket
const socket = io();

socket.emit('message', 'Comunicacion desde webSocket');

socket.on('message', (data) => {
	console.log(data);
});
