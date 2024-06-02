import { RefreshToken, Usuario } from '@prisma/client';
import * as argon2 from 'argon2';
import AuthController from '../../controllers/auth-controller';
import { mockRequest, mockResponse } from '../mocks/express';
import { prismaMock } from '../mocks/prisma';
import { ZodError } from 'zod';
import jwt from 'jsonwebtoken';

describe('AuthController', () => {
  let usuario: Usuario;
  let JWT_SECRET_KEY: string;

  beforeAll(async () => {
    JWT_SECRET_KEY = 'segredo_jwt_testes';
    process.env.JWT_SECRET_KEY = JWT_SECRET_KEY;

    usuario = {
      id: '1',
      nomeUsuario: 'fulano',
      senha: await argon2.hash('teste123'),
    };
  });

  describe('login', () => {
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

  describe('register', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('Se falta algo no corpo da requisição, lança erro de validação', async () => {
      const req = mockRequest({ body: { nomeUsuario: 'sicrano' } });
      const res = mockResponse;

      await expect(AuthController.register(req, res)).rejects.toThrow(ZodError);
    });

    test('Se o nome de usuário é curto demais, lança erro de validação', async () => {
      const req = mockRequest({
        body: {
          nomeUsuario: 'sic',
          senha: 'teste123',
          confirmacaoSenha: 'teste123',
        },
      });
      const res = mockResponse;

      await expect(AuthController.register(req, res)).rejects.toThrow(ZodError);
    });

    test('Se a senha é curta demais, lança erro de validação', async () => {
      const req = mockRequest({
        body: {
          nomeUsuario: 'sicrano',
          senha: 'teste12',
          confirmacaoSenha: 'teste12',
        },
      });
      const res = mockResponse;

      await expect(AuthController.register(req, res)).rejects.toThrow(ZodError);
    });

    test('Se as senhas são diferentes, lança erro de validação', async () => {
      const req = mockRequest({
        body: {
          nomeUsuario: 'sicrano',
          senha: 'teste123',
          confirmacaoSenha: 'teste1234',
        },
      });
      const res = mockResponse;

      await expect(AuthController.register(req, res)).rejects.toThrow(ZodError);
    });

    test('Se nome de usuário em uso, retorna 400 e mensagem', async () => {
      const req = mockRequest({
        body: {
          nomeUsuario: 'fulano',
          senha: 'teste123',
          confirmacaoSenha: 'teste123',
        },
      });
      const res = mockResponse;

      prismaMock.usuario.findUnique.mockResolvedValue(usuario);

      await AuthController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Nome de usuário em uso',
        details: {
          nomeUsuario: 'O nome de usuário já está em uso',
        },
      });
    });

    test('Se ocorre com sucesso, retorna 201, usuário criado e tokens de acesso', async () => {
      const req = mockRequest({
        body: {
          nomeUsuario: 'fulano',
          senha: 'teste123',
          confirmacaoSenha: 'teste123',
        },
      });
      const res = mockResponse;

      prismaMock.usuario.findUnique.mockResolvedValue(null);
      prismaMock.usuario.create.mockResolvedValue({
        id: usuario.id,
        nomeUsuario: usuario.nomeUsuario,
      } as Usuario);

      await AuthController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          usuario: {
            id: usuario.id,
            nomeUsuario: usuario.nomeUsuario,
          },
          accessToken: expect.anything(),
          refreshToken: expect.anything(),
        })
      );
    });
  });

  describe('refresh', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('Se refreshToken inválido, retorna 401', async () => {
      const req = mockRequest({
        body: { refreshToken: 'refreshTokenInválido' },
      });
      const res = mockResponse;

      prismaMock.refreshToken.delete.mockRejectedValue(new Error());

      await AuthController.refresh(req, res);

      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    test('Se refreshToken válido retorna 200 e novos tokens', async () => {
      const refreshToken: RefreshToken = {
        token: jwt.sign({ id: usuario.id }, JWT_SECRET_KEY, {
          expiresIn: '3d',
        }),
        usuarioId: usuario.id,
      };

      const req = mockRequest({
        body: { refreshToken: refreshToken.token },
      });
      const res = mockResponse;

      prismaMock.refreshToken.delete.mockResolvedValue(refreshToken);

      await AuthController.refresh(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          accessToken: expect.anything(),
          refreshToken: expect.anything(),
        })
      );
    });
  });
});
