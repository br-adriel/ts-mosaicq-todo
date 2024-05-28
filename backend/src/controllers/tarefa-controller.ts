import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { GetOneTarefaParams } from '../types/controllers/tarefa-controller';

export default class TarefaController {
  static async getAll(req: Request, res: Response) {
    const tarefas = await prisma.tarefa.findMany();
    return res.status(200).json({ tarefas });
  }

  static async getOne(req: Request<GetOneTarefaParams>, res: Response) {
    const tarefa = await prisma.tarefa.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!tarefa) return res.sendStatus(404);
    return res.status(200).json(tarefa);
  }
}
