import * as argon2 from 'argon2';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { loginSchema, registerSchema } from '../schemas/auth-schemas';

function generateToken(userId: string) {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET_KEY!,
    { expiresIn: '1d', subject: userId }
  );
}

export default class AuthController {
  static async login(req: Request, res: Response) {
    /**
    #swagger.tags = ['Autenticação']
    #swagger.summary = 'Realiza login na API'
    #swagger.requestBody = {
      required: true,
      schema: { $ref: "#/components/schemas/loginBody" }
    }
    */
    /**
    #swagger.responses[200] = {
      description: 'Retorna o token de acesso.',
      schema: { $ref: '#/components/schemas/loginResponse' }
    }
    */
    const body = loginSchema.parse(req.body);

    const usuario = await prisma.usuario.findUnique({
      where: {
        nomeUsuario: body.nomeUsuario,
      },
    });

    const correctPassword = usuario
      ? await argon2.verify(usuario.senha, body.senha)
      : false;

    if (!usuario || !correctPassword) {
      return res.status(401).json({
        error: 'Nome de usuário ou senha inválidos',
      });
    }

    const accessToken = generateToken(usuario.id);
    return res.status(200).json({ accessToken });
  }

  static async register(req: Request, res: Response) {
    /**
    #swagger.tags = ['Autenticação']
    #swagger.summary = 'Registra um novo usuário na API'
    #swagger.requestBody = {
      required: true,
      schema: { $ref: '#/components/schemas/registerBody' }
    }
    */
    /**
    #swagger.responses[200] = {
      description: 'Retorna o usuário criado e o token de acesso.',
      schema: { $ref: '#/components/schemas/registerResponse' }
    }
    */
    const body = registerSchema.parse(req.body);
    const usernameTaken = await prisma.usuario.findUnique({
      where: {
        nomeUsuario: body.nomeUsuario,
      },
    });

    if (usernameTaken) {
      return res.status(400).json({
        error: 'Nome de usuário em uso',
        details: {
          nomeUsuario: 'O nome de usuário já está em uso',
        },
      });
    }

    const hashedPassword = await argon2.hash(body.senha);
    const usuario = await prisma.usuario.create({
      data: {
        nomeUsuario: body.nomeUsuario,
        senha: hashedPassword,
      },
      select: {
        id: true,
        nomeUsuario: true,
      },
    });
    const accessToken = generateToken(usuario.id);

    return res.status(201).json({ accessToken });
  }
}
