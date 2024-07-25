import { Repository } from 'typeorm';
import { EquipoCompetitivo } from '@/entities/EquipoCompetitivoEntity';
import AppDataSource from '@/config/ormconfig';

export class EquipoCompetitivoService {
    private readonly equipoCompetitivoRepository: Repository<EquipoCompetitivo>;

    constructor() {
        this.equipoCompetitivoRepository =
            AppDataSource.getRepository(EquipoCompetitivo);
    }

    async createEquipoCompetitivo(
        data: Partial<EquipoCompetitivo>,
    ): Promise<EquipoCompetitivo> {
        const equipoCompetitivo = this.equipoCompetitivoRepository.create(data);
        return await this.equipoCompetitivoRepository.save(equipoCompetitivo);
    }

    async getEquipoCompetitivoById(
        id: number,
    ): Promise<EquipoCompetitivo | null> {
        return await this.equipoCompetitivoRepository.findOneBy({ id });
    }

    async updateEquipoCompetitivo(
        id: number,
        data: Partial<EquipoCompetitivo>,
    ): Promise<EquipoCompetitivo | null> {
        await this.equipoCompetitivoRepository.update(id, data);
        return this.getEquipoCompetitivoById(id);
    }

    async deleteEquipoCompetitivo(id: number): Promise<void> {
        await this.equipoCompetitivoRepository.delete(id);
    }

    async getAllEquipoCompetitivos(): Promise<EquipoCompetitivo[]> {
        return await this.equipoCompetitivoRepository.find();
    }
}
