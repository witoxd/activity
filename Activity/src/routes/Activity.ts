import { Application } from "express";
import { ActivitysController } from "../controllers/Activity.controllers";
import { authMiddleware } from "../middleware/authMiddleware";
export class ActivityRoutes {
    public ActivitysController = new ActivitysController();

    public routes(app: Application): void {
        app.route("/Activity").get(authMiddleware, this.ActivitysController.getAllActivity);
        app.route('/Activity/:id').get(authMiddleware, this.ActivitysController.getOneActivity);
        app.route("/Activity").post(authMiddleware, this.ActivitysController.createActivity);
        app.route("/Activity/:id").put(authMiddleware, this.ActivitysController.updateActivity);
        app.route("/Activity/:id").delete(authMiddleware, this.ActivitysController.deleteActivitys);

        app.route("/Activity2").get( this.ActivitysController.getAllActivity);
        app.route('/Activity2/:id').get( this.ActivitysController.getOneActivity);
        app.route("/Activity2").post( this.ActivitysController.createActivity);
        app.route("/Activity2/:id").put( this.ActivitysController.updateActivity);
        app.route("/Activity2/:id").delete( this.ActivitysController.deleteActivitys);
    }
};