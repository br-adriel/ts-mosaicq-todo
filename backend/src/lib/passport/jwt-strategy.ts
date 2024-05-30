import { ExtractJwt, Strategy, VerifyCallback } from 'passport-jwt';
import prisma from '../prisma';

const validate: VerifyCallback = async (payload, done) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: payload.id },
      select: {
        id: true,
        nomeUsuario: true,
      },
    });
    return done(null, usuario || false);
  } catch (err) {
    return done(err);
  }
};

export const jwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY!,
  },
  validate
);
