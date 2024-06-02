import { z } from 'zod';
import { validateData } from '../../middlewares/validation-middleware';
import { mockRequest, mockResponse } from '../mocks/express';

describe('ValidationMiddleware', () => {
  describe('validateData', () => {
    const testSchema = z.object({
      nome: z.string().min(3, 'Deve ter no mínimo 3 caracteres'),
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('Se o esquema é validado (body), passa para o próximo controlador', async () => {
      const req = mockRequest({ body: { nome: 'sicrano' } });
      const res = mockResponse;
      const next = jest.fn();

      const middleware = validateData(testSchema);
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    test('Se o esquema é validado (params), passa para o próximo controlador', async () => {
      const req = mockRequest({ params: { nome: 'sicrano' } });
      const res = mockResponse;
      const next = jest.fn();

      const middleware = validateData(testSchema, 'params');
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    test('Se o esquema é invalidado (body), retorna 400 e mensagem de erro', async () => {
      const req = mockRequest({ body: { nome: 's' } });
      const res = mockResponse;
      const next = jest.fn();

      const middleware = validateData(testSchema);
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Dados inválidos',
        details: expect.anything(),
      });
    });

    test('Se o esquema é invalidado (params), retorna 400 e mensagem de erro', async () => {
      const req = mockRequest({ params: { nome: 's' } });
      const res = mockResponse;
      const next = jest.fn();

      const middleware = validateData(testSchema, 'params');
      middleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Dados inválidos',
        details: expect.anything(),
      });
    });

    test('Se o erro não é de validação, retorna 500', async () => {
      const req = mockRequest({ body: { nome: 'sicrano' } });
      const res = mockResponse;
      const next = () => {
        throw new Error();
      };

      const middleware = validateData(testSchema);
      middleware(req, res, next);

      expect(res.sendStatus).toHaveBeenCalledWith(500);
    });
  });
});
