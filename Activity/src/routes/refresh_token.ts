import { Application } from "express";
import { RefreshTokenController } from "../controllers/refres_token.controller";
import { authMiddleware } from "../middleware/authMiddleware";

export class RefreshTokenRoutes {
  public refreshTokenController: RefreshTokenController = new RefreshTokenController();

  public routes(app: Application): void {
    app.route("/refresk-token").get(this.refreshTokenController.getAllRefreshToken);
  }
}