import {  Request, Response } from 'express';
import { Activity, ActivityI } from '../models/Activity';

export class ActivitysController {

    public async test(req: Request, res:Response){
        try {
            res.send('hola, metodo test para Activity, @Comprobado por batman')
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getAllActivity(req: Request, res:Response){
        try {
            const Activitys: ActivityI[] = await Activity.findAll() 
            res.status(200).json({Activitys})
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    public async getOneActivity(req: Request, res:Response){
        const { id: idParam } = req.params

        try {
            const Activitys:ActivityI | null = await Activity.findOne(
                {
                    where: { 
                        id: idParam,
                    }
                }
            )
            if (Activitys){
                res.status(200).json(Activitys)
            } else return  res.status(300).json({msg: "La Activity no existe"})

        } catch (error) {
            res.status(500).json({msg: "Error Internal"})
        }
    }

    public async createActivity(req: Request, res:Response){
        const {
            date_act,
            description,
            name,
            UserId,
        } = req.body;

        try {
            let body:ActivityI = {
                date_act,
                description,
                name,
                UserId,
            } 

            const Activitys:ActivityI = await Activity.create({...body});
            return res.status(200).json({Activitys});

        } catch (error) {
            res.status(500).json({ error });
        }

    }

    public async updateActivity(req: Request, res:Response){
        const { id:pk } = req.params;

        const {
            id,
            date_act,
            description,
            name,
            UserId,
        }= req.body

        try {
            let body:ActivityI = {
            date_act,
            description,
            name,
            UserId,
            } 

            const ActivitysExist: ActivityI | null = await Activity.findByPk(pk);
            // const userExist: UsuarioI | null = await Usuario.findOne(
            //     {
            //         where: { id: pk}
            //     }
            // );

            if(!ActivitysExist) return res.status(500).json({msg:"La activity No existe"})
            await Activity.update(
                body,{
                    where: {id:pk}
                }
            );  // select update from usuarios where id=pk



        } catch (error) {
            res.status(500).json({ error });
        }
        const Activitys: ActivityI | null = await Activity.findByPk(pk);
        if(Activitys) return res.status(200).json({Activitys})

    }

    public async deleteActivitys(req: Request, res:Response){
        const { id:pk } = req.params;


        try {
            const ActivitysExist: ActivityI | null = await Activity.findByPk(pk);
            if(!ActivitysExist) return res.status(500).json({msg:"El Activitys No existe"})
            await Activity.destroy(
                {
                    where: {id: pk}
                }
            )
            res.status(200).json({msg:"Activity Eliminada"})
        } catch (error) {
            res.status(500).json({ error });
        }

    } 

}