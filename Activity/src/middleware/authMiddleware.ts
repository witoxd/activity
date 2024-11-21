import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RefreshToken } from '../models/RefreshToken';
import { User } from '../models/User';
import { RoleUser } from '../models/RoleUser';
import { Role } from '../models/Role';
import { Permission } from '../models/Permission';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  const currentMethod = req.method;

  if (!token) {
    res.status(401).json({ error: 'Acceso denegado' });
    return;
  }

  try {
    // Verificar el token principal
    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET || 'secret') as jwt.JwtPayload;
    const isAuthorized = await permissionResource(jwtPayload.id, currentMethod);
    console.log(isAuthorized);
    if (!isAuthorized) {
      res.status(403).json({ error: 'No tienes permisos para realizar esta acción' });
      return;
    }

    next(); // Permitir el acceso
  } catch (error) {
    // Manejar expiración del token y verificar con refreshToken
    const decoded = jwt.decode(token) as jwt.JwtPayload;

    if (!decoded || !decoded.id) {
      res.status(401).json({ error: 'Token inválido o mal formado' });
      return;
    }

    const refreshTokenRecord = await RefreshToken.findOne({
      where: { user_id: decoded.id, is_valid: true },
      order: [['created_at', 'DESC']]
    });

    if (!refreshTokenRecord || refreshTokenRecord.expires_at < new Date()) {
      if (refreshTokenRecord) {
        refreshTokenRecord.is_valid = false;
        await refreshTokenRecord.save();
      }
      res.status(401).json({ error: 'Refresh token inválido o expirado' });
      return;
    }

    const user = await User.findOne({ where: { id: decoded.id, is_active: true } });

    if (!user) {
      res.status(401).json({ error: 'Usuario no encontrado' });
      return;
    }

    const newToken = user.generateToken();
    res.setHeader('Authorization', `Bearer ${newToken}`);
    next();
  }
};

export const permissionResource = async (userId: number, resourceMethod: string): Promise<boolean> => {
  console.log(resourceMethod);
  try {
    const userWithPermissions = await User.findAll({
      
      where: { id: userId, is_active: true },
      include: [
        {
          model: RoleUser,
          required: true,
          include: [
            {
              model: Role,
              required: true,
              include: [
                {
                  model: Permission,
                  where: { name: resourceMethod },
                  required: true
                }
              ]
            }
          ]
        }
      ]
    });

    return userWithPermissions.length > 0;
  } catch (error) {
    console.error('Error checking permissions:', error);
    return false;
  }
};
