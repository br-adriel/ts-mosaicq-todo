import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export default class TarefaController {
  static async getAll(req: Request, res: Response) {
    const tarefas = await prisma.tarefa.findMany();
    return res.status(200).json({ tarefas });
  }
}
