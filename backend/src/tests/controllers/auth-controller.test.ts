import { Usuario } from '@prisma/client';
import * as argon2 from 'argon2';
import AuthController from '../../controllers/auth-controller';
import { mockRequest, mockResponse } from '../mocks/express';
import { prismaMock } from '../mocks/prisma';

describe('AuthController', () => {
  beforeAll(() => {
    process.env.JWT_SECRET_KEY = 'segredo_jwt_testes';
  });

  describe('login', () => {
    let usuario: Usuario;

    beforeAll(async () => {
      usuario = {
        id: '1',
        nomeUsuario: 'fulano',
        senha: await argon2.hash('teste123'),
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('Senha incorreta retorna 401 e mensagem', async () => {
      const req = mockRequest({
        body: { nomeUsuario: usuario.nomeUsuario, senha: 'teste122' },
      });
      const res = mockResponse;

      prismaMock.usuario.findUnique.mockResolvedValue(usuario);

      await AuthController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Nome de usuário ou senha inválidos',
      });
    });

    test('Nome de usuário incorreto retorna 401 e mensagem', async () => {
      const req = mockRequest({
        body: { nomeUsuario: 'fulanu', senha: 'teste123' },
      });
      const res = mockResponse;

      prismaMock.usuario.findUnique.mockResolvedValue(null);

      await AuthController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Nome de usuário ou senha inválidos',
      });
    });

    test('Nome de usuário e senha incorretos retornam 401 e mensagem', async () => {
      const req = mockRequest({
        body: { nomeUsuario: 'fulanu', senha: 'teste122' },
      });
      const res = mockResponse;

      prismaMock.usuario.findUnique.mockResolvedValue(usuario);

      await AuthController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Nome de usuário ou senha inválidos',
      });
    });

    test('Credenciais corretas retornam 200 e tokens', async () => {
      const req = mockRequest({
        body: { nomeUsuario: usuario.nomeUsuario, senha: 'teste123' },
      });
      const res = mockResponse;

      prismaMock.usuario.findUnique.mockResolvedValue(usuario);

      await AuthController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          accessToken: expect.anything(),
          refreshToken: expect.anything(),
        })
      );
    });
  });

  describe('register', () => {});

  describe('refresh', () => {});
});
