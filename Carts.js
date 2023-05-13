import fs from 'fs';

export default class Carts {

    #id = 0;

    constructor() {
        this.carts = [];
        this.patch = "./carts.json";
    }


    async getCarts() {
        try {
            const Archivo = await fs.promises.readFile(this.patch, 'utf-8');
            this.carts = JSON.parse(Archivo);
            return this.carts;
        }
        catch (err) {
            console.log('NO se pudo LEER los carritos');
        }
    }


    async addCart() {
        try {
            const cart = ({
                "id": 0,
                "products": []
            });

            cart.id = this.#getID();

            this.carts.push(cart);

            await fs.promises.writeFile(this.patch, JSON.stringify(this.carts));
        }
        catch (err) {
            console.log('NO se pudo AGREGAR el carrito');
        }
    }


    #getID() {
        this.carts.forEach(cart => cart.id > this.#id ? this.#id = cart.id : this.#id);
        this.#id++;
        //console.log(this.#id);
        return this.#id;
    }


    async getCartByID(idCart) {
        try {
            const Archivo = await fs.promises.readFile(this.patch, 'utf-8');
            this.carts = JSON.parse(Archivo);

            const CartIndex = this.carts.findIndex(
                (cart) => cart.id == idCart
            );

            if (CartIndex === -1) {
                console.log('No existe el carrito');
                return;
            }

            return this.carts[CartIndex].products;
        }
        catch (err) {
            console.log('NO se pudo CONSULTAR el carrito');;
        }
    }


    async addItemCart(idCart, idProduct, quantity) {
        try {
            const CartIndex = this.carts.findIndex(
                (cart) => cart.id == idCart
            );

            if (CartIndex === -1) {
                console.log('No existe el carrito');
                return;
            }

            const ProductIndex = this.carts[CartIndex].products.findIndex(
                (producto) => producto.idProduct == idProduct
            );

            if (ProductIndex === -1) {
                const product = ({
                    "idProduct": parseInt(idProduct),
                    "quantity": quantity
                });

                this.carts[CartIndex].products.push(product);
            } else {
                this.carts[CartIndex].products[ProductIndex].quantity += quantity;
            }

            await fs.promises.writeFile(this.patch, JSON.stringify(this.carts));

        }
        catch (err) {
            console.log('NO se pudo AGREGAR el producto al carrito');;
        }
    }


    async deleteItemCart(idCart, idProduct) {
        try {
            const CartIndex = this.carts.findIndex(
                (cart) => cart.id == idCart
            );

            if (CartIndex === -1) {
                console.log('No existe el carrito');
                return;
            }

            const ProductIndex = this.carts[CartIndex].products.findIndex(
                (producto) => producto.idProduct == idProduct
            );

            if (ProductIndex === -1) {
                console.log('No existe el producto en el carrito');
                return;
            }

            this.carts[CartIndex].products.splice(ProductIndex, 1);

            await fs.promises.unlink(this.patch);
            await fs.promises.writeFile(this.patch, JSON.stringify(this.carts));
        }
        catch (err) {
            console.log('NO se pudo ELIMINAR el producto del carrito');;
        }

    }
}