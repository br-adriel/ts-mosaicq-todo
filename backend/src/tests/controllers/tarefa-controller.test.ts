import { Tarefa } from '@prisma/client';
import { ZodError } from 'zod';
import TarefaController from '../../controllers/tarefa-controller';
import { mockRequest, mockResponse } from '../mocks/express';
import { prismaMock } from '../mocks/prisma';

describe('TarefaControler', () => {
  describe('getAll', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('Retorna lista vazia quando não há tarefas', async () => {
      const req = mockRequest({ user: { id: '1' } });
      const res = mockResponse;

      prismaMock.tarefa.findMany.mockResolvedValue([]);

      await TarefaController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        tarefas: [],
      });
    });

    test('Retorna todas as tarefas do banco', async () => {
      const req = mockRequest({ user: { id: '1' } });
      const res = mockResponse;

      const mockTarefas: Tarefa[] = [
        {
          id: '1',
          usuarioId: '1',
          status: 'PENDENTE',
          dataCriacao: new Date('2023-05-01'),
          descricao: '',
          titulo: 'Tarefa 1',
        },
        {
          id: '2',
          usuarioId: '1',
          status: 'EM_PROGRESSO',
          dataCriacao: new Date('2023-06-01'),
          descricao: '',
          titulo: 'Tarefa 2',
        },
        {
          id: '3',
          usuarioId: '1',
          status: 'CONCLUIDA',
          dataCriacao: new Date('2023-04-01'),
          descricao: '',
          titulo: 'Tarefa 3',
        },
      ];

      prismaMock.tarefa.findMany.mockResolvedValue(mockTarefas);

      await TarefaController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        tarefas: mockTarefas,
      });
    });
  });

  describe('getOne', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('Retorna 404 quando não encontra a tarefa', async () => {
      const req = mockRequest({ user: { id: '1' }, params: { id: '1' } });
      const res = mockResponse;

      prismaMock.tarefa.findUnique.mockResolvedValue(null);

      await TarefaController.getOne(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    test('Retorna a tarefa quando ela existe e pertence ao usuário', async () => {
      const req = mockRequest({ user: { id: '1' }, params: { id: '1' } });
      const res = mockResponse;

      const tarefa: Tarefa = {
        dataCriacao: new Date(),
        descricao: '',
        id: '1',
        status: 'EM_PROGRESSO',
        titulo: 'Minha tarefa',
        usuarioId: '1',
      };
      prismaMock.tarefa.findUnique.mockResolvedValue(tarefa);

      await TarefaController.getOne(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(tarefa);
    });

    test('Retorna 403 quando a tarefa não pertence ao usuário', async () => {
      const req = mockRequest({ user: { id: '1' }, params: { id: '1' } });
      const res = mockResponse;

      const tarefa: Tarefa = {
        dataCriacao: new Date(),
        descricao: '',
        id: '1',
        status: 'EM_PROGRESSO',
        titulo: 'Tarefa de outra pessoa',
        usuarioId: '2',
      };
      prismaMock.tarefa.findUnique.mockResolvedValue(tarefa);

      await TarefaController.getOne(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(403);
    });
  });

  describe('create', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('Lança erro de validação quando faltam dados obrigatórios', async () => {
      const req = mockRequest({ user: { id: '1' }, body: {} });
      const res = mockResponse;

      await expect(TarefaController.create(req, res)).rejects.toThrow(ZodError);
    });

    test('Retorna a tarefa criada com os dados corretos', async () => {
      const req = mockRequest({
        user: { id: '1' },
        body: {
          titulo: 'Minha tarefa',
        },
      });
      const res = mockResponse;

      const tarefa: Tarefa = {
        dataCriacao: new Date(),
        descricao: '',
        id: '1',
        status: 'PENDENTE',
        titulo: 'Minha tarefa',
        usuarioId: '1',
      };
      prismaMock.tarefa.create.mockResolvedValue(tarefa);

      await TarefaController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(tarefa);
    });
  });

  describe('update', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('Retorna 404 quando a tarefa não existe', async () => {
      const req = mockRequest({
        user: { id: '1' },
        body: {
          titulo: 'Minha tarefa',
        },
        params: { id: '1' },
      });
      const res = mockResponse;

      prismaMock.tarefa.findUnique.mockResolvedValue(null);

      await TarefaController.update(req, res);
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    test('Retorna 403 quando a tarefa não pertence ao usuário', async () => {
      const req = mockRequest({
        user: { id: '1' },
        body: {
          titulo: 'Minha tarefa',
        },
        params: { id: '1' },
      });
      const res = mockResponse;

      const tarefa: Tarefa = {
        dataCriacao: new Date(),
        descricao: '',
        id: '1',
        status: 'PENDENTE',
        titulo: 'Minha tarefa',
        usuarioId: '2',
      };
      prismaMock.tarefa.findUnique.mockResolvedValue(tarefa);

      await TarefaController.update(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(403);
    });

    test('Retorna a tarefa atualizada', async () => {
      const req = mockRequest({
        user: { id: '1' },
        body: {
          titulo: 'Minha tarefa renomeada',
        },
        params: { id: '1' },
      });
      const res = mockResponse;

      const tarefa: Tarefa = {
        dataCriacao: new Date(),
        descricao: '',
        id: '1',
        status: 'PENDENTE',
        titulo: 'Minha tarefa',
        usuarioId: '1',
      };
      const tarefaAtualizada: Tarefa = {
        ...tarefa,
        titulo: 'Minha tarefa renomeada',
      };
      prismaMock.tarefa.findUnique.mockResolvedValue(tarefa);
      prismaMock.tarefa.update.mockResolvedValue(tarefaAtualizada);

      await TarefaController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(tarefaAtualizada);
    });
  });
});
