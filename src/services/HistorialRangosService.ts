import { Repository } from 'typeorm';
import { HistorialRangos } from '@/entities/HistorialRangosEntity';
import AppDataSource from '@/config/ormconfig';
import { NotFoundError } from '@/middlewares/appError';

export class HistorialRangosService {
    private readonly historialRangosRepository: Repository<HistorialRangos>;

    constructor() {
        this.historialRangosRepository = AppDataSource.getRepository(HistorialRangos);
    }

    async createHistorialRangos(data: Partial<HistorialRangos>): Promise<HistorialRangos> {
        const historialRangos = this.historialRangosRepository.create({
            ...data,
            fechaRegistro: Date.now(), // Fecha actual en formato EPOCH
        });

        return await this.historialRangosRepository.save(historialRangos);
    }

    async getHistorialRangosById(id: number): Promise<HistorialRangos | null> {
        return await this.historialRangosRepository.findOne({
            where: { id },
            relations: ['cuentaInvocador'],
        });
    }

    async updateHistorialRangos(id: number, data: Partial<HistorialRangos>): Promise<HistorialRangos | null> {
        await this.historialRangosRepository.update(id, data);
        return this.getHistorialRangosById(id);
    }

    async deleteHistorialRangos(id: number): Promise<void> {
        const historialRangos = await this.getHistorialRangosById(id);

        if (!historialRangos) {
            throw new NotFoundError('Historial de rangos no encontrado.');
        }

        await this.historialRangosRepository.delete(id);
    }

    async getAllHistorialRangos(): Promise<HistorialRangos[]> {
        return await this.historialRangosRepository.find({
            relations: ['cuentaInvocador'],
        });
    }
}
