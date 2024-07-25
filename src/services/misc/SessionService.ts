import { getRepository } from 'typeorm';
import { Session } from '@/entities/misc/SessionEntity';

class SessionService {
    private sessionRepository = getRepository(Session);

    async createSession(usuarioId: number, token: string, expiresAt: Date) {
        const session = this.sessionRepository.create({
            usuario: { id: usuarioId },
            token,
            expiresAt,
        });
        await this.sessionRepository.save(session);
        return session;
    }

    async getSession(token: string) {
        return await this.sessionRepository.findOne({ where: { token } });
    }

    async deleteSession(token: string) {
        await this.sessionRepository.delete({ token });
    }
}

export const sessionService = new SessionService();
