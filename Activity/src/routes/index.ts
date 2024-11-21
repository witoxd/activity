
import { UserRoutes } from './user';
import { RoleRoutes } from './role';
import { RoleUserRoutes } from './role_user';
import { RefreshTokenRoutes } from './refresh_token';
import { AuthRoutes } from './AuthController';
import { AuthTokenRoutes } from './auth';
import { ActivityRoutes } from './Activity';
export class Routes {

    public userRoutes: UserRoutes = new UserRoutes();
    public roleRoutes: RoleRoutes = new RoleRoutes();
    public roleUserRoutes: RoleUserRoutes = new RoleUserRoutes();
    public authRoutes: AuthRoutes = new AuthRoutes();
    public refreshTokenRoutes: RefreshTokenRoutes = new RefreshTokenRoutes();
    public authTokenRoutes: AuthTokenRoutes = new AuthTokenRoutes();
    public ActivityRoutes: ActivityRoutes = new ActivityRoutes();
}
