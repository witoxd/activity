import { Application } from "express";

import { AuthControllerToken } from '../controllers/AuthController';
import { authMiddleware } from "../middleware/authMiddleware";

export class AuthTokenRoutes {
  public AuthControllerToken: AuthControllerToken = new AuthControllerToken();

  public routes(app: Application): void {
    app.route("/Refresh").post(this.AuthControllerToken.authenticateWithRefreshToken);
    app.route("/Token").post(this.AuthControllerToken.authenticateWithToken);
  }
}