import jwt from 'jsonwebtoken';
import { Usuario } from '@/entities/UsuarioEntity';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '30d';

export class AuthService {
    static generateToken(user: Usuario): string {
        return jwt.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });
    }

    static verifyToken(token: string): jwt.JwtPayload | string {
        return jwt.verify(token, JWT_SECRET);
    }
}
