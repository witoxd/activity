import { Application } from "express";
import { AuthController } from '../controllers/auth.controller';

export class AuthRoutes {
    public authController: AuthController = new AuthController();
    public routes(app: Application): void {
        app.route("/register").post(this.authController.register);
        app.route("/login").post(this.authController.login);
    }
}