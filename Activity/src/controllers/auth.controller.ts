import { Request, Response } from 'express';
import { User } from '../models/User';
import { RefreshToken } from '../models/RefreshToken';

export class AuthController {
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password, is_active, avatar } = req.body;
      const user_interface: User = await User.create({ username, email, password, is_active, avatar });
      const token = user_interface.generateToken();
      // const refresh_token = user_interface.generateRefreshToken();
      res.status(201).json({ user_interface, token });
    } catch (error) {
      res.status(500).json({ error: 'Error al registrar el usuario' });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user: User | null = await User.findOne(
        { 
          where: { 
            email,
            is_active: true 
          } 
      });
      if (!user || !(await user.checkPassword(password))) {
        res.status(401).json({ error: 'Credenciales inválidas' });
        return;
      }
      const token = user.generateToken();
      const { token: refreshToken, expiresAt } = user.generateRefreshToken();

      // Crear un nuevo registro en RefreshToken
      
      await RefreshToken.create({
        user_id: user.id,
        token: refreshToken,
        device_info: req.headers['user-agent'] || 'unknown',
        is_valid: true,
        expires_at: expiresAt
      });

      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  }

}