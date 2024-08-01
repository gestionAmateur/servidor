import { Repository } from 'typeorm';
import { HistorialEquipo } from '@/entities/HistorialEquipoEntity';
import { Usuario } from '@/entities/UsuarioEntity';
import { EquipoCompetitivo } from '@/entities/EquipoCompetitivoEntity';
import AppDataSource from '@/config/ormconfig';

export class HistorialEquipoService {
    private readonly historialEquipoRepository: Repository<HistorialEquipo>;

    constructor() {
        this.historialEquipoRepository =
            AppDataSource.getRepository(HistorialEquipo);
    }

    async createOrUpdateHistorial(
        usuarioId: number,
        equipoId: number,
    ): Promise<HistorialEquipo> {
        const usuarioRepository = AppDataSource.getRepository(Usuario);
        const equipoRepository = AppDataSource.getRepository(EquipoCompetitivo);

        // Obtener el usuario y el equipo
        const usuario = await usuarioRepository.findOneBy({ id: usuarioId });
        const equipo = await equipoRepository.findOneBy({ id: equipoId });

        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        if (!equipo) {
            throw new Error('Equipo no encontrado');
        }

        // Buscar un historial existente para el usuario y equipo
        let historial = await this.historialEquipoRepository.findOne({
            where: { usuario: { id: usuarioId }, equipo: { id: equipoId } },
        });

        if (historial) {
            // Si ya existe un historial, actualizar la fecha de fin si es necesario
            if (historial.fechaFin !== null) {
                // Ya está en el historial con fechaFin, crear uno nuevo
                historial = this.historialEquipoRepository.create({
                    usuario,
                    equipo,
                    fechaInicio: Date.now(),
                });
            } else {
                // Si no hay fechaFin, entonces está activo
                return historial;
            }
        } else {
            // Si no existe el historial, crear uno nuevo
            historial = this.historialEquipoRepository.create({
                usuario,
                equipo,
                fechaInicio: Date.now(),
            });
        }

        // Guardar el historial
        await this.historialEquipoRepository.save(historial);

        return historial;
    }

    async closeHistorial(usuarioId: number, equipoId: number): Promise<void> {
        const historial = await this.historialEquipoRepository.findOne({
            where: { usuario: { id: usuarioId }, equipo: { id: equipoId } },
        });

        if (historial && historial.fechaFin === null) {
            historial.fechaFin = Date.now();
            await this.historialEquipoRepository.save(historial);
        }
    }

    async getHistorialEquipoById(id: number): Promise<HistorialEquipo | null> {
        return await this.historialEquipoRepository.findOneBy({ id });
    }

    async updateHistorialEquipo(
        id: number,
        data: Partial<HistorialEquipo>,
    ): Promise<HistorialEquipo | null> {
        await this.historialEquipoRepository.update(id, data);
        return this.getHistorialEquipoById(id);
    }

    async deleteHistorialEquipo(id: number): Promise<void> {
        await this.historialEquipoRepository.delete(id);
    }

    async getAllHistorialEquipos(): Promise<HistorialEquipo[]> {
        return await this.historialEquipoRepository.find({
            relations: ['usuario', 'equipo'],
        });
    }
}
