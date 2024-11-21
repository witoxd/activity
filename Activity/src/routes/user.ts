import { Application } from "express";
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from "../middleware/authMiddleware";

export class UserRoutes {
  public userController: UserController = new UserController();

  public routes(app: Application): void {
    app.route("/users").get(this.userController.getAllUsers);

  }
}