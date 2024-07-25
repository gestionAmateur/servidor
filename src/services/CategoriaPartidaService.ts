import { Repository } from 'typeorm';
import { CategoriaPartida } from '@/entities/CategoriaPartidaEntity';
import AppDataSource from '@/config/ormconfig';

export class CategoriaPartidaService {
    private readonly categoriaPartidaRepository: Repository<CategoriaPartida>;

    constructor() {
        this.categoriaPartidaRepository =
            AppDataSource.getRepository(CategoriaPartida);
    }

    async createCategoriaPartida(
        data: Partial<CategoriaPartida>,
    ): Promise<CategoriaPartida> {
        const categoriaPartida = this.categoriaPartidaRepository.create(data);
        return await this.categoriaPartidaRepository.save(categoriaPartida);
    }

    async getCategoriaPartidaById(
        id: number,
    ): Promise<CategoriaPartida | null> {
        return await this.categoriaPartidaRepository.findOneBy({ id });
    }

    async updateCategoriaPartida(
        id: number,
        data: Partial<CategoriaPartida>,
    ): Promise<CategoriaPartida | null> {
        await this.categoriaPartidaRepository.update(id, data);
        return this.getCategoriaPartidaById(id);
    }

    async deleteCategoriaPartida(id: number): Promise<void> {
        await this.categoriaPartidaRepository.delete(id);
    }

    async getAllCategoriaPartidas(): Promise<CategoriaPartida[]> {
        return await this.categoriaPartidaRepository.find();
    }
}
