import { Application } from "express";
import { RoleUserController } from '../controllers/role_user.controller';

export class RoleUserRoutes {
  public roleUserController: RoleUserController = new RoleUserController();

  public routes(app: Application): void {
    app.route("/roleUsers").get(this.roleUserController.getAllRoleUsers);
  }
}