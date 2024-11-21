import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { RefreshToken } from '../models/RefreshToken';
import { User } from '../models/User';

export class AuthControllerToken {
  /**
   * Autenticación con token.
   */
  public async authenticateWithToken(req: Request, res: Response): Promise<void> {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ error: 'Acceso denegado. No se encontró el token.' });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as jwt.JwtPayload;

      const user = await User.findOne({ where: { id: decoded.id, is_active: true } });

      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado o inactivo.' });
        return;
      }

      res.status(200).json({ message: 'Autenticación exitosa', user });
    } catch (error) {
      res.status(401).json({ error: 'Token inválido o expirado.' });
    }
  }

  /**
   * Autenticación con refresh token.
   */
  public async authenticateWithRefreshToken(req: Request, res: Response): Promise<void> {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ error: 'Acceso denegado. No se encontró el refresh token.' });
      return;
    }

    try {
      const refreshTokenRecord = await RefreshToken.findOne({
        where: { token: refreshToken, is_valid: true },
      });

      if (!refreshTokenRecord || refreshTokenRecord.expires_at < new Date()) {
        res.status(401).json({ error: 'Refresh token inválido o expirado.' });
        return;
      }

      const user = await User.findOne({ where: { id: refreshTokenRecord.user_id, is_active: true } });

      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado o inactivo.' });
        return;
      }

      // Generar un nuevo token JWT
      const newToken = user.generateToken();

      res.status(200).json({ message: 'Autenticación exitosa', token: newToken });
    } catch (error) {
      res.status(500).json({ error: 'Error al autenticar con el refresh token.' });
    }
  }
}
