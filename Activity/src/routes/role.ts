import { Application } from "express";
import { RoleController } from '../controllers/role.controller';

export class RoleRoutes {
  public roleController: RoleController = new RoleController();

  public routes(app: Application): void {
    app.route("/roles").get(this.roleController.getAllRoles);
  }
}