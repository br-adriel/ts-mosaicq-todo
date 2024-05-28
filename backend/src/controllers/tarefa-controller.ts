import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import {
  createTarefaSchema,
  getOneTarefaParams,
  updateTarefaParams,
  updateTarefaSchema,
} from '../schemas/tarefa-schemas';

export default class TarefaController {
  static async getAll(req: Request, res: Response) {
    const tarefas = await prisma.tarefa.findMany();
    return res.status(200).json({ tarefas });
  }

  static async getOne(req: Request, res: Response) {
    const params = getOneTarefaParams.parse(req.params);
    const tarefa = await prisma.tarefa.findUnique({
      where: {
        id: params.id,
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

  static async update(req: Request, res: Response) {
    const params = updateTarefaParams.parse(req.params);
    const tarefa = await prisma.tarefa.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!tarefa) return res.sendStatus(404);

    const data = updateTarefaSchema.parse(req.body);
    const tarefaAtualizada = await prisma.tarefa.update({
      data,
      where: {
        id: params.id,
      },
    });
    return res.status(200).json(tarefaAtualizada);
  }
}
