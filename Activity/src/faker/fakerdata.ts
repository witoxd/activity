import { Cliente } from '../models/U';
import { TipoProducto } from '../models/TipoProducto';
import { Productos } from '../models/Productos';
import { Ventas } from '../models/Venta';
import { Producto_venta } from '../models/Producto_venta';
import { faker } from '@faker-js/faker';

async function createFakeData() {
    // Crear clientes falsos
    for (let i = 0; i < 50; i++) {
        await Cliente.create({
            nombre: faker.name.fullName(),
            direccion: faker.address.streetAddress(),
            telefono: faker.phone.number(),
            correo: faker.internet.email(),
            password: faker.internet.password(),
            estado: faker.datatype.boolean()
        });
    }

    // Crear tipos de productos falsos
    for (let i = 0; i < 5; i++) {
        await TipoProducto.create({
            nombre: faker.commerce.department(),
            descripcion: faker.commerce.productDescription(),
            estado: faker.datatype.boolean()
        });
    }

    // Crear productos falsos
    const tipoProductos = await TipoProducto.findAll();
    for (let i = 0; i < 20; i++) {
        await Productos.create({
            nombre: faker.commerce.productName(),
            marca: faker.company.name(),
            precio: faker.commerce.price(),
            stokMin: faker.number.int({ min: 1, max: 10 }),
            cantidad: faker.number.int({ min: 1, max: 100 }),
            TipoProductoId: tipoProductos[faker.number.int({ min: 0, max: tipoProductos.length - 1 })].get('id')

        });
    }

    // Crear ventas falsas
    const clientes = await Cliente.findAll();
    for (let i = 0; i < 10; i++) {
        await Ventas.create({
            fecha: faker.date.past(),
            subtotal: faker.commerce.price(),
            impuestos: faker.commerce.price(),
            descuento: faker.commerce.price(),
            total: faker.commerce.price(),
            clientes_id: clientes[faker.number.int({ min: 0, max: clientes.length - 1 })].get('id'),

        });
    }

    // Crear productos ventas falsos
    const ventas = await Ventas.findAll();
    const productos = await Productos.findAll();
    for (let i = 0; i < 30; i++) {
        await Producto_venta.create({
            Cantidad: faker.number.int({ min: 1, max: 10 }),
            precio: faker.commerce.price(),
            total: faker.commerce.price(),
            VentasId: ventas[faker.number.int({ min: 0, max: ventas.length - 1 })].get('id'),
            ProductosId: productos[faker.number.int({ min: 0, max: productos.length - 1 })].get('id'),
        });
    }
}

createFakeData().then(() => {
    console.log('Datos falsos creados exitosamente');
}).catch((error) => {
    console.error('Error al crear datos falsos:', error);
});

// Para ejecutar este script, ejecute el siguiente comando:
// npm install -g ts-node
// ts-node src/faker/populate_data.ts
// npm install faker @faker-js/faker