import { Repository } from 'typeorm';
import { EquipoCompetitivo } from '@/entities/EquipoCompetitivoEntity';
import AppDataSource from '@/config/ormconfig';

export class EquipoCompetitivoService {
    private readonly equipoRepository: Repository<EquipoCompetitivo>;

    constructor() {
        this.equipoRepository = AppDataSource.getRepository(EquipoCompetitivo);
    }

    async createEquipoCompetitivo(
        data: Partial<EquipoCompetitivo>,
    ): Promise<EquipoCompetitivo> {
        const equipoCompetitivo = this.equipoRepository.create(data);
        return await this.equipoRepository.save(equipoCompetitivo);
    }

    async getEquipoCompetitivoById(
        id: number,
    ): Promise<EquipoCompetitivo | null> {
        // Incluir la relación con los usuarios
        return await this.equipoRepository.findOne({
            where: { id },
            relations: ['usuarios'],
        });
    }

    async updateEquipoCompetitivo(
        id: number,
        data: Partial<EquipoCompetitivo>,
    ): Promise<EquipoCompetitivo | null> {
        await this.equipoRepository.update(id, data);
        return this.getEquipoCompetitivoById(id);
    }

    async deleteEquipoCompetitivo(id: number): Promise<void> {
        await this.equipoRepository.delete(id);
    }

    async getAllEquipoCompetitivos(): Promise<EquipoCompetitivo[]> {
        return await this.equipoRepository.find({
            relations: ['usuarios'],
        });
    }
}
