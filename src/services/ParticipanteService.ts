import { Repository } from 'typeorm';
import { Participante } from '@/entities/ParticipanteEntity';
import AppDataSource from '@/config/ormconfig';

export class ParticipanteService {
    private readonly participanteRepository: Repository<Participante>;

    constructor() {
        this.participanteRepository = AppDataSource.getRepository(Participante);
    }

    async createParticipante(
        data: Partial<Participante>,
    ): Promise<Participante> {
        const participante = this.participanteRepository.create(data);
        return await this.participanteRepository.save(participante);
    }

    async getParticipanteById(id: number): Promise<Participante | null> {
        return await this.participanteRepository.findOneBy({ id });
    }

    async updateParticipante(
        id: number,
        data: Partial<Participante>,
    ): Promise<Participante | null> {
        await this.participanteRepository.update(id, data);
        return this.getParticipanteById(id);
    }

    async deleteParticipante(id: number): Promise<void> {
        await this.participanteRepository.delete(id);
    }

    async getAllParticipantes(): Promise<Participante[]> {
        return await this.participanteRepository.find();
    }
}
