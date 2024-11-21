import express, { Application } from 'express';
import morgan from 'morgan';
import { Routes } from '../routes';
import cors from 'cors';  
//var cors = require("cors"); // install en node y types

export class App {
    public routePrv: Routes =  new Routes();
    app: Application;

    constructor(
        private port?: number | string
    ) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes()
    }

    private settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    private middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json()); // leer json raw
        this.app.use(express.urlencoded({ extended: false })); //leer json form
    }

    routes() {

        this.routePrv.userRoutes.routes(this.app)
        this.routePrv.roleRoutes.routes(this.app)
        this.routePrv.roleUserRoutes.routes(this.app)
        this.routePrv.authRoutes.routes(this.app)
        this.routePrv.refreshTokenRoutes.routes(this.app)
        this.routePrv.authTokenRoutes.routes(this.app)
        this.routePrv.ActivityRoutes.routes(this.app)
    }


   async listen() {
        await this.app.listen(this.app.get('port'));
        // await this.app.listen(this.port);
        // console.log('Server on port', this.port);
        console.log('Server on port', this.app.get('port'));
    }

}
