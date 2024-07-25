import { Repository } from 'typeorm';
import { Sesion } from '@/entities/misc/SesionEntity';
import AppDataSource from '@/config/ormconfig';

class SesionService {
    private readonly sesionRepository: Repository<Sesion>;

    constructor() {
        this.sesionRepository = AppDataSource.getRepository(Sesion);
    }

    async createSesion(data: Partial<Sesion>): Promise<Sesion> {
        const sesion = this.sesionRepository.create(data);
        return await this.sesionRepository.save(sesion);
    }

    async getSesion(token: string): Promise<Sesion | null> {
        return await this.sesionRepository.findOne({
            where: { token },
            relations: ['usuario'],
        });
    }

    async deleteSesion(token: string): Promise<void> {
        await this.sesionRepository.delete(token);
    }
}

export const sesionService = new SesionService();
