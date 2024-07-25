import { Repository } from 'typeorm';
import { Partida } from '@/entities/PartidaEntity';
import AppDataSource from '@/config/ormconfig';

export class PartidaService {
    private readonly partidaRepository: Repository<Partida>;

    constructor() {
        this.partidaRepository = AppDataSource.getRepository(Partida);
    }

    async createPartida(data: Partial<Partida>): Promise<Partida> {
        const partida = this.partidaRepository.create(data);
        return await this.partidaRepository.save(partida);
    }

    async getPartidaById(id: number): Promise<Partida | null> {
        return await this.partidaRepository.findOneBy({ id });
    }

    async updatePartida(
        id: number,
        data: Partial<Partida>,
    ): Promise<Partida | null> {
        await this.partidaRepository.update(id, data);
        return this.getPartidaById(id);
    }

    async deletePartida(id: number): Promise<void> {
        await this.partidaRepository.delete(id);
    }

    async getAllPartidas(): Promise<Partida[]> {
        return await this.partidaRepository.find();
    }
}
