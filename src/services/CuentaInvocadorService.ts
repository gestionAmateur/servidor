import { Repository } from 'typeorm';
import axios from 'axios';

import { CuentaInvocador } from '@/entities/CuentaInvocadorEntity';
import { HistorialRangos } from '@/entities/HistorialRangosEntity';
import AppDataSource from '@/config/ormconfig';
import { AuthService } from '@/services/misc/AuthService';
import { BadRequestError, NotFoundError } from '@/middlewares/appError';

export class CuentaInvocadorService {
    private readonly cuentaInvocadorRepository: Repository<CuentaInvocador>;
    private readonly historialRangosRepository: Repository<HistorialRangos>;

    constructor() {
        this.cuentaInvocadorRepository =
            AppDataSource.getRepository(CuentaInvocador);
        this.historialRangosRepository =
            AppDataSource.getRepository(HistorialRangos);
    }

    async createCuentaInvocador(
        data: Partial<CuentaInvocador>,
    ): Promise<CuentaInvocador> {
        await this.validateUniqueNombreTag(
            data.nombreInvocador!,
            data.tagInvocador!,
        );

        // Validar el invocador en la API de Riot y obtener el puuid
        const { puuid } = await this.validateCuentaInRiotAPI(
            data.nombreInvocador!,
            data.tagInvocador!,
        );

        // Llamar al nuevo endpoint para obtener el id
        const riotId = await this.getRiotIdByPuuid(puuid);

        data.puuid = puuid;
        data.cuentaId = riotId;

        // Crear la cuenta de invocador y guardarla
        const cuentaInvocador = this.cuentaInvocadorRepository.create(data);
        const savedCuentaInvocador = await this.cuentaInvocadorRepository.save(
            cuentaInvocador,
        );

        return savedCuentaInvocador;
    }

    async getCuentaInvocadorById(id: number): Promise<CuentaInvocador | null> {
        return await this.cuentaInvocadorRepository.findOne({
            where: { id },
            relations: ['usuario', 'historialRangos'],
        });
    }

    async updateCuentaInvocador(
        id: number,
        data: Partial<CuentaInvocador>,
    ): Promise<CuentaInvocador | null> {
        await this.cuentaInvocadorRepository.update(id, data);
        return this.getCuentaInvocadorById(id);
    }

    async deleteCuentaInvocador(id: number, token: string): Promise<void> {
        const decodedToken = AuthService.verifyToken(token);
        if (typeof decodedToken === 'string') {
            throw new Error('Invalid token');
        }
    
        const userId = decodedToken.id;
        const cuentaInvocador = await this.getCuentaInvocadorById(id);
    
        if (!cuentaInvocador) {
            throw new NotFoundError('Esta cuenta no existe');
        }
    
        if (cuentaInvocador.usuario.id !== userId) {
            throw new BadRequestError('Esta no es tu cuenta');
        }
    
        // Eliminar el historial de rangos asociado
        await this.historialRangosRepository.createQueryBuilder()
            .delete()
            .from(HistorialRangos)
            .where("cuentaInvocadorId = :id", { id })
            .execute();
    
        // Eliminar la cuenta de invocador
        await this.cuentaInvocadorRepository.delete(id);
    }

    async getAllCuentaInvocadores(): Promise<CuentaInvocador[]> {
        return await this.cuentaInvocadorRepository.find({
            relations: ['historialRangos'],
        });
    }

    async updateNombreYTagInvocador(
        puuid: string,
    ): Promise<CuentaInvocador | null> {
        const riotApiKey = process.env.RIOT_API_KEY;
        const apiUrl = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}?api_key=${riotApiKey}`;

        try {
            const response = await axios.get(apiUrl);
            const { gameName, tagLine } = response.data;

            const cuentaInvocador =
                await this.cuentaInvocadorRepository.findOne({
                    where: { puuid },
                });

            if (!cuentaInvocador) {
                throw new NotFoundError('Cuenta de invocador no encontrada.');
            }

            cuentaInvocador.nombreInvocador = gameName;
            cuentaInvocador.tagInvocador = tagLine;

            return await this.cuentaInvocadorRepository.save(cuentaInvocador);
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                throw new BadRequestError(
                    'La cuenta de invocador no existe en la API de Riot.',
                );
            }
            throw new BadRequestError(
                'Error al actualizar el nombre y tag del invocador.',
            );
        }
    }

    private async validateUniqueNombreTag(
        nombreInvocador: string,
        tagInvocador: string,
    ): Promise<void> {
        const existingCuenta = await this.cuentaInvocadorRepository.findOne({
            where: { nombreInvocador, tagInvocador },
        });

        if (existingCuenta) {
            throw new BadRequestError(
                'Ya existe una cuenta con este nombre y tag.',
            );
        }
    }

    private async validateCuentaInRiotAPI(
        nombreInvocador: string,
        tagInvocador: string,
    ): Promise<{ puuid: string }> {
        const riotApiKey = process.env.RIOT_API_KEY;
        const apiUrl = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
            nombreInvocador,
        )}/${encodeURIComponent(tagInvocador)}`;

        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    'X-Riot-Token': riotApiKey,
                },
            });

            const { puuid } = response.data;
            return { puuid };
        } catch (error) {
            throw new BadRequestError('El invocador introducido no existe.');
        }
    }

    private async getRiotIdByPuuid(puuid: string): Promise<string> {
        const riotApiKey = process.env.RIOT_API_KEY;
        const apiUrl = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${riotApiKey}`;

        try {
            const response = await axios.get(apiUrl);
            const { id } = response.data;
            return id;
        } catch (error) {
            throw new BadRequestError('Error al obtener el id de Riot.');
        }
    }
}
