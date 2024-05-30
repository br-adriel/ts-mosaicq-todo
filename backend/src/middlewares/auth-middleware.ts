import passport from 'passport';
import { jwtStrategy } from '../lib/passport/jwt-strategy';

export const isAuthenticated = passport.authenticate(jwtStrategy, {
  session: false,
});
