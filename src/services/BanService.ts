import { Repository } from 'typeorm';
import { Ban } from '@/entities/BanEntity';
import AppDataSource from '@/config/ormconfig';

export class BanService {
    private readonly banRepository: Repository<Ban>;

    constructor() {
        this.banRepository = AppDataSource.getRepository(Ban);
    }

    async createBan(data: Partial<Ban>): Promise<Ban> {
        const ban = this.banRepository.create(data);
        return await this.banRepository.save(ban);
    }

    async getBanById(id: number): Promise<Ban | null> {
        return await this.banRepository.findOneBy({ id });
    }

    async updateBan(id: number, data: Partial<Ban>): Promise<Ban | null> {
        await this.banRepository.update(id, data);
        return this.getBanById(id);
    }

    async deleteBan(id: number): Promise<void> {
        await this.banRepository.delete(id);
    }

    async getAllBans(): Promise<Ban[]> {
        return await this.banRepository.find();
    }
}
