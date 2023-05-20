// Inicializamos el socket
const socket = io();

function addItem() {
	const product = {
		"id": 0,
		"title": "Cables Tetrapolares",
		"description": "Cable tetrapolar 4.1 MARRON",
		"price": 60000,
		"thumbnail": "D:\\Users\\Pablo\\Documents\\Coder\\foto.jpg",
		"code": "UF4-TETRA",
		"stock": 4000,
		"category": "TETRA",
		"status": false
	}
	socket.emit('addItem', product);
}

function deleteItem() {
	const idItem = document.getElementById('idItem').value;
	socket.emit('deleteItem', idItem);
}

function render(products, cant) {
	// Genero el html
	const html = products
		.map((elem, index) => {
			// Recorro el array de productos y genero el html
			return `<li>
			${elem.id} - ${elem.code} - ${elem.description} - ${elem.price}
            </li>`;
		})
		.join(' '); // Convierto el array de strings en un string

	// Inserto el html en el elemento 
	document.getElementById('lista').innerHTML = html;
	document.getElementById('titleCant').innerHTML = cant;

}

socket.on('reload', (products) => {
	const cant = products.length;
	render(products, cant);
});


