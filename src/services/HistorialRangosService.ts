import { Repository } from 'typeorm';
import { HistorialRangos } from '@/entities/HistorialRangosEntity';
import AppDataSource from '@/config/ormconfig';
import { NotFoundError } from '@/middlewares/appError';
import axios from 'axios'; // Asegúrate de instalar axios
import { CuentaInvocador } from '@/entities/CuentaInvocadorEntity';

export class HistorialRangosService {
    private readonly historialRangosRepository: Repository<HistorialRangos>;

    constructor() {
        this.historialRangosRepository =
            AppDataSource.getRepository(HistorialRangos);
    }

    private async fetchRiotData(id: string): Promise<any> {
        // Reemplaza con la URL real del endpoint de Riot que estés usando
        const url = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.RIOT_API_KEY}`;
        console.log(url);
        const response = await axios.get(url);
        return response.data;
    }

    async createOrUpdateHistorialRangos(
        cuenta: CuentaInvocador,
    ): Promise<HistorialRangos[]> {
        // Obtener datos de Riot
        const riotData = await this.fetchRiotData(cuenta.cuentaId);

        if (!riotData || riotData.length === 0) {
            throw new NotFoundError('Datos de Riot no encontrados.');
        }

        // Filtrar los datos para obtener solo los que tengan queueType = "RANKED_SOLO_5x5"
        const filteredData = riotData.filter(
            (item: any) => item.queueType === 'RANKED_SOLO_5x5',
        );

        if (filteredData.length === 0) {
            throw new NotFoundError(
                'No se encontraron datos de RANKED_SOLO_5x5.',
            );
        }

        console.log(cuenta.id);
        console.log(cuenta);
        // Mapear los datos filtrados a la estructura esperada
        const data = filteredData.map((item: any) => ({
            leagueId: item.leagueId,
            queueType: item.queueType,
            tier: item.tier,
            rank: item.rank,
            summonerId: item.summonerId,
            leaguePoints: item.leaguePoints,
            wins: item.wins,
            losses: item.losses,
            veteran: item.veteran,
            inactive: item.inactive,
            freshBlood: item.freshBlood,
            hotStreak: item.hotStreak,
            fechaRegistro: Date.now(),
            cuentaInvocador: cuenta,
        }));

        // Crear o actualizar cada entrada
        const promises = data.map(async (item: HistorialRangos) => {
            return this.historialRangosRepository.create(item);
        });

        // Guardar todas las entradas en la base de datos
        const historialRangosList = await Promise.all(promises);
        return this.historialRangosRepository.save(historialRangosList);
    }

    async getHistorialRangosById(id: number): Promise<HistorialRangos | null> {
        return await this.historialRangosRepository.findOne({
            where: { id },
            relations: ['cuentaInvocador'],
        });
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
