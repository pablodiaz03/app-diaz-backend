import fs from 'fs';

export default class ProductManager {

    #id = 0;

    constructor() {
        this.products = [];
        this.patch = "./products.json";

        //fs.promises.writeFile(this.patch, JSON.stringify(this.products));

        // if (!fs.existsSync(this.patch)) {
        //     fs.promises.writeFile(this.patch, JSON.stringify(this.products));
        // }
        // else {
        //     console.log("El archivo ya existe");
        // }
    }

    async getProducts() {
        try {
            const Archivo = await fs.promises.readFile(this.patch, 'utf-8');
            this.products = JSON.parse(Archivo);
            return this.products;
        }
        catch (err) {
            console.log('NO se pudo LEER los productos');
        }
    }

    async addProduct(product) {
        try {
            const ProductIndex = this.products.findIndex(
                (producto) => producto.code === product.code
            );

            if (ProductIndex != -1) {
                console.log('El producto ya existe!');
                return;
            }

            if (product.description == null || product.price == null || product.thumbnail == null || product.code == null || product.stock == null) {
                console.log("Falta un dato del producto. Todos los campos son obligatorios");
                return;
            }

            product.id = this.#getID();

            this.products.push(product);

            await fs.promises.writeFile(this.patch, JSON.stringify(this.products));
        }
        catch (err) {
            console.log('NO se pudo AGREGAR el producto');
        }
    }

    #getID() {
        this.#id++;
        return this.#id;
    }

    async getProductByID(idProduct) {
        try {
            const Archivo = await fs.promises.readFile(this.patch, 'utf-8');
            this.products = JSON.parse(Archivo);

            const ProductIndex = this.products.findIndex(
                (product) => product.id == idProduct
            );

            if (ProductIndex === -1) {
                console.log('No existe el producto');
                return;
            }

            return this.products.filter(product => product.id == idProduct);
        }
        catch (err) {
            console.log('NO se pudo CONSULTAR el producto');;
        }
    }

    async updateProduct(product) {
        try {
            const ProductIndex = this.products.findIndex(
                (producto) => producto.id === product.id
            );

            if (ProductIndex === -1) {
                console.log('No existe el producto');
                return;
            }

            //const producto = this.products[ProductIndex];

            // const newProducto = {
            //     ...product,
            //     id: product.id
            // }
            // this.products.push
            this.products[ProductIndex] = product;

            await fs.promises.writeFile(this.patch, JSON.stringify(this.products));

        }
        catch (err) {
            console.log('NO se pudo MODIFICAR el producto');;
        }
    }

    async deleteProduct(idProduct) {
        try {
            const ProductIndex = this.products.findIndex(
                (product) => product.id === idProduct
            );

            if (ProductIndex === -1) {
                console.log('No existe el producto');
                return;
            }

            this.products.splice(ProductIndex, 1);

            await fs.promises.unlink(this.patch);
            await fs.promises.writeFile(this.patch, JSON.stringify(this.products));
        }
        catch (err) {
            console.log('NO se pudo ELIMINAR el producto');;
        }

    }
}


// const productManager = new ProductManager();

// const prueba = async () => {
//     try {
//         console.log(await productManager.getProducts());

//         await productManager.addProduct({
//             id: 0,
//             tile: "Cables",
//             description: "Cable unipolar 1x1.5 Negro",
//             price: 1500,
//             thumbnail: "D:\\Users\\Pablo\Documents\\Coder\\foto.jpg",
//             code: "UF1.5-N",
//             stock: 1000
//         });
//         await productManager.addProduct({
//             id: 0,
//             tile: "Cables",
//             description: "Cable Subterraneo 3x2.5",
//             price: 3500,
//             thumbnail: "D:\\Users\\Pablo\\Documents\\Coder\\foto.jpg",
//             code: "SEG-3X2.5",
//             stock: 5000
//         });

//         console.log(await productManager.getProducts());
//         console.log(await productManager.getProductByID(1));

//         await productManager.updateProduct({
//             id: 1,
//             tile: "Lamparas",
//             description: "Lampara Led E27 60w",
//             price: 8000,
//             thumbnail: "D:\\Users\\Pablo\\Documents\\Coder\\foto.jpg",
//             code: "L60W",
//             stock: 6000
//         });

//         console.log(await productManager.getProducts());

//         await productManager.deleteProduct(2);

//         console.log(await productManager.getProducts());
//     }
//     catch (err) {
//         console.log('No se pudo testear');
//     };
// };

//prueba();
