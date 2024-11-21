const Sequelize = require('sequelize');

const DB_NAME = 'Activity';

const DB_USER = 'admin';

const DB_PASS = 'romero';



export const database = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,

    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }

);

/*
 const DB_NAME = 'servicio_AntonioCeballos';  // Nombre de la base de datos en SQL Server
const DB_USER = 'sa';  // Usuario de SQL Server (por defecto 'sa' es el usuario de administrador)
const DB_PASS = 'Joterias7u7@';  // Contraseña del usuario de SQL Server

export const database = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,
    {
        host: 'localhost',  // Dirección del servidor (localhost si es local)
        dialect: 'mssql',   // Dialecto para SQL Server
        port: 1433,         // Puerto predeterminado de SQL Server
        dialectOptions: {
            options: {
                encrypt: false,  // Desactivar encriptación si no está configurada en el servidor
                trustServerCertificate: true,  // Para evitar errores de certificados en entornos de desarrollo
            }
        }
    }
);
*/

/*
const DB_NAME = 'servicio_AntonioCeballos'; // Base de datos predeterminada

const DB_USER = 'postgres';

const DB_PASS = 'romero';

export const database = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,
    {
        host: 'localhost',
        dialect: 'postgres',
        port: 5432
    }
);
*/


async function generateDb() {
    await database.sync({ force: false })
    console.log('Base de datos y tablas creada');
}

generateDb();
