import { Repository } from 'typeorm';
import { HistorialEquipo } from '@/entities/HistorialEquipoEntity';
import AppDataSource from '@/config/ormconfig';

export class HistorialEquipoService {
    private readonly historialEquipoRepository: Repository<HistorialEquipo>;

    constructor() {
        this.historialEquipoRepository =
            AppDataSource.getRepository(HistorialEquipo);
    }

    async createHistorialEquipo(
        data: Partial<HistorialEquipo>,
    ): Promise<HistorialEquipo> {
        const historialEquipo = this.historialEquipoRepository.create(data);
        return await this.historialEquipoRepository.save(historialEquipo);
    }

    async getHistorialEquipoById(id: number): Promise<HistorialEquipo | null> {
        return await this.historialEquipoRepository.findOneBy({ id });
    }

    async updateHistorialEquipo(
        id: number,
        data: Partial<HistorialEquipo>,
    ): Promise<HistorialEquipo | null> {
        await this.historialEquipoRepository.update(id, data);
        return this.getHistorialEquipoById(id);
    }

    async deleteHistorialEquipo(id: number): Promise<void> {
        await this.historialEquipoRepository.delete(id);
    }

    async getAllHistorialEquipos(): Promise<HistorialEquipo[]> {
        return await this.historialEquipoRepository.find();
    }
}
