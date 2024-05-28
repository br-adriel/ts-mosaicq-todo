import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { createTarefaSchema } from '../schemas/tarefa-schemas';
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

  static async create(req: Request, res: Response) {
    const data = createTarefaSchema.parse(req.body);
    const tarefa = await prisma.tarefa.create({
      data: {
        ...data,
        descricao: data.descricao || '',
      },
    });
    return res.status(201).json(tarefa);
  }
}
