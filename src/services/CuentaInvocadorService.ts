import { Repository } from 'typeorm';
import { CuentaInvocador } from '@/entities/CuentaInvocadorEntity';
import AppDataSource from '@/config/ormconfig';

export class CuentaInvocadorService {
    private readonly cuentaInvocadorRepository: Repository<CuentaInvocador>;

    constructor() {
        this.cuentaInvocadorRepository =
            AppDataSource.getRepository(CuentaInvocador);
    }

    async createCuentaInvocador(
        data: Partial<CuentaInvocador>,
    ): Promise<CuentaInvocador> {
        const cuentaInvocador = this.cuentaInvocadorRepository.create(data);
        return await this.cuentaInvocadorRepository.save(cuentaInvocador);
    }

    async getCuentaInvocadorById(id: number): Promise<CuentaInvocador | null> {
        return await this.cuentaInvocadorRepository.findOneBy({ id });
    }

    async updateCuentaInvocador(
        id: number,
        data: Partial<CuentaInvocador>,
    ): Promise<CuentaInvocador | null> {
        await this.cuentaInvocadorRepository.update(id, data);
        return this.getCuentaInvocadorById(id);
    }

    async deleteCuentaInvocador(id: number): Promise<void> {
        await this.cuentaInvocadorRepository.delete(id);
    }

    async getAllCuentaInvocadores(): Promise<CuentaInvocador[]> {
        return await this.cuentaInvocadorRepository.find();
    }
}
