import { Request, Response } from 'express';
import { Role, RoleI } from '../models/Role';

export class RoleController {
  public async getAllRoles(req: Request, res: Response): Promise<void> {
    try {
      const roles: RoleI[] = await Role.findAll();
      res.status(200).json({ roles });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los roles' });
    }
  }
}