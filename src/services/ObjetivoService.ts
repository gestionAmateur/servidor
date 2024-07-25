import { Repository } from 'typeorm';
import { Objetivo } from '@/entities/ObjetivoEntity';
import AppDataSource from '@/config/ormconfig';

export class ObjetivoService {
    private readonly objetivoRepository: Repository<Objetivo>;

    constructor() {
        this.objetivoRepository = AppDataSource.getRepository(Objetivo);
    }

    async createObjetivo(data: Partial<Objetivo>): Promise<Objetivo> {
        const objetivo = this.objetivoRepository.create(data);
        return await this.objetivoRepository.save(objetivo);
    }

    async getObjetivoById(id: number): Promise<Objetivo | null> {
        return await this.objetivoRepository.findOneBy({ id });
    }

    async updateObjetivo(
        id: number,
        data: Partial<Objetivo>,
    ): Promise<Objetivo | null> {
        await this.objetivoRepository.update(id, data);
        return this.getObjetivoById(id);
    }

    async deleteObjetivo(id: number): Promise<void> {
        await this.objetivoRepository.delete(id);
    }

    async getAllObjetivos(): Promise<Objetivo[]> {
        return await this.objetivoRepository.find();
    }
}
