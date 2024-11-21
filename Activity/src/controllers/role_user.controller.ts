import { Request, Response } from 'express';
import { RoleUser, RoleUserI } from '../models/RoleUser';

export class RoleUserController {
  public async getAllRoleUsers(req: Request, res: Response): Promise<void> {
    try {
      const roleUsers: RoleUserI[] = await RoleUser.findAll();
      res.status(200).json({ roleUsers });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios de roles' });
    }
  }
}