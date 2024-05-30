import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import {
  createTarefaSchema,
  deleteTarefaParams,
  getOneTarefaParams,
  updateTarefaParams,
  updateTarefaSchema,
} from '../schemas/tarefa-schemas';

export default class TarefaController {
  static async getAll(req: Request, res: Response) {
    /**
    #swagger.tags = ['Tarefas']
    #swagger.summary = 'Busca todas as tarefas'
    #swagger.responses[200] = {
      description: 'Retorna todas as tarefas.',
      schema: { $ref: '#/components/schemas/tarefaAll' }
    }
    */
    const tarefas = await prisma.tarefa.findMany({
      orderBy: [{ status: 'asc' }, { dataCriacao: 'desc' }],
    });
    return res.status(200).json({ tarefas });
  }

  static async getOne(req: Request, res: Response) {
    /**
    #swagger.tags = ['Tarefas']
    #swagger.summary = 'Busca a tarefa com o id referente.'
    #swagger.responses[200] = {
      description: 'Retorna a tarefa solicitada.',
      schema: { $ref: '#/components/schemas/tarefa' }
    }
    #swagger.responses[404] = {
      description: 'Tarefa não encontrada.'
    }
    */
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
    /**
    #swagger.tags = ['Tarefas']
    #swagger.summary = 'Cria uma nova tarefa.'
    #swagger.requestBody = {
      required: true,
      schema: {
        $ref: "#/components/schemas/tarefaCreateBody"
      }
    }
    #swagger.responses[201] = {
      description: 'Objeto criado com sucesso. Retorna o objeto criado.',
      schema: { $ref: '#/components/schemas/tarefa' }
    }
    #swagger.responses[400] = {
      description: 'Há algo de errado com a requisição.',
      schema: { $ref: '#/components/schemas/error400' }
    }
    */
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
    /**
    #swagger.tags = ['Tarefas']
    #swagger.summary = 'Atualiza uma tarefa'
    #swagger.requestBody = {
      required: true,
      schema: {
        $ref: "#/components/schemas/tarefaUpdateBody"
      }
    }
    #swagger.responses[200] = {
      description: 'Atualização realizada com sucesso. Retorna o objeto atualizado.',
      schema: { $ref: '#/components/schemas/tarefa' }
    }
    #swagger.responses[400] = {
      description: 'Há algo de errado com a requisição.',
      schema: { $ref: '#/components/schemas/error400' }
    }
    #swagger.responses[404] = {
      description: 'Tarefa não encontrada.'
    }
    */
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

  static async delete(req: Request, res: Response) {
    /**
    #swagger.tags = ['Tarefas']
    #swagger.summary = 'Exclui uma tarefa.'
    #swagger.responses[200] = {
      description: 'Tarefa deletada com sucesso.'
    }
    #swagger.responses[404] = {
      description: 'Tarefa não encontrada.'
    }
    */
    const params = deleteTarefaParams.parse(req.params);
    const tarefa = await prisma.tarefa.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!tarefa) return res.sendStatus(404);

    await prisma.tarefa.delete({ where: { id: params.id } });
    return res.sendStatus(200);
  }
}
