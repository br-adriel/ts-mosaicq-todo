import { Tarefa } from '@prisma/client';
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
});
