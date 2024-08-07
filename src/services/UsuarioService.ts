import { Repository } from 'typeorm';
import AppDataSource from '@/config/ormconfig';
import { Usuario } from '@/entities/UsuarioEntity';
import { sesionService } from './misc/SesionService';
import { EquipoCompetitivo } from '@/entities/EquipoCompetitivoEntity';
import { HistorialEquipoService } from './HistorialEquipoService';
import { NotFoundError } from '@/middlewares/appError';

export class UsuarioService {
    private readonly usuarioRepository: Repository<Usuario>;
    private readonly equipoRepository: Repository<EquipoCompetitivo>;
    private readonly historialEquipoService: HistorialEquipoService;

    constructor() {
        this.usuarioRepository = AppDataSource.getRepository(Usuario);
        this.equipoRepository = AppDataSource.getRepository(EquipoCompetitivo);
        this.historialEquipoService = new HistorialEquipoService();
    }

    async createUsuario(data: Partial<Usuario>): Promise<Usuario> {
        const usuario = this.usuarioRepository.create(data);
        return await this.usuarioRepository.save(usuario);
    }

    private async getUsuarioWithRelations(id: number): Promise<Usuario | null> {
        return await this.usuarioRepository.findOne({
            where: { id },
            relations: [
                'cuentasInvocador',
                'equipos',
                'equipos.usuarios',
                'equipos.fundador',
                'historial.equipo',
                'notificaciones',
            ],
        });
    }

    private async getUsuarioWithDetails(id: number) {
        const usuario = await this.getUsuarioWithRelations(id);
        if (!usuario) {
            return null;
        }

        // Devolver el usuario sin `equiposHistorial`
        return {
            usuario: {
                id: usuario.id,
                discordId: usuario.discordId,
                discordAvatar: usuario.discordAvatar,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
                redesSociales: usuario.redesSociales,
                cuentasInvocador: usuario.cuentasInvocador,
                equipos: usuario.equipos,
                historial: usuario.historial,
                notificaciones: usuario.notificaciones,
            },
            // No incluir `equiposHistorial` en el resultado
        };
    }

    async getUsuarioById(id: number): Promise<any> {
        return await this.getUsuarioWithDetails(id);
    }

    async getUsuarioByNombre(nombre: string): Promise<any> {
        const usuario = await this.usuarioRepository.findOne({
            where: { nombre },
            relations: ['cuentasInvocador', 'equipos', 'historial.equipo'],
        });
        if (!usuario) {
            return null;
        }
        return await this.getUsuarioWithDetails(usuario.id);
    }

    async getUsuarioByDiscordId(discordId: string): Promise<any> {
        const usuario = await this.usuarioRepository.findOne({
            where: { discordId },
            relations: ['cuentasInvocador', 'equipos', 'historial.equipo'],
        });
        if (!usuario) {
            return null;
        }
        return await this.getUsuarioWithDetails(usuario.id);
    }

    async updateUsuario(
        id: number,
        data: Partial<Usuario>,
    ): Promise<Usuario | null> {
        await this.usuarioRepository.update(id, data);
        return this.getUsuarioById(id);
    }

    async deleteUsuario(id: number): Promise<void> {
        await this.usuarioRepository.delete(id);
    }

    async getAllUsuarios(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            relations: ['equipos'],
        });
    }

    async getUsuarioDetailsByToken(token: string): Promise<any> {
        const sesion = await sesionService.getSesion(token);
        if (!sesion || !sesion.usuario) {
            return null;
        }
        return await this.getUsuarioWithDetails(sesion.usuario.id);
    }

    async addEquipoToUsuario(
        usuarioId: number,
        equipoId: number,
    ): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: usuarioId },
            relations: ['equipos'],
        });
        const equipo = await this.equipoRepository.findOneBy({ id: equipoId });

        if (!usuario) {
            throw new NotFoundError('Usuario no encontrado.');
        }
        if (!equipo) {
            throw new NotFoundError('Equipo no encontrado.');
        }

        // Añadir el equipo al usuario si no está presente
        if (!usuario.equipos.some((e) => e.id === equipoId)) {
            usuario.equipos.push(equipo);
            await this.usuarioRepository.save(usuario);

            // Crear o actualizar el historial para el equipo
            await this.historialEquipoService.createOrUpdateHistorial(
                usuarioId,
                equipoId,
            );
        }

        return usuario;
    }

    async removeEquipoFromUsuario(
        usuarioId: number,
        equipoId: number,
    ): Promise<Usuario> {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: usuarioId },
            relations: ['equipos'],
        });
        const equipo = await this.equipoRepository.findOneBy({ id: equipoId });

        if (!usuario) {
            throw new NotFoundError('Usuario no encontrado.');
        }
        if (!equipo) {
            throw new NotFoundError('Equipo no encontrado.');
        }

        // Eliminar el equipo del usuario si está presente
        if (usuario.equipos.some((e) => e.id === equipoId)) {
            usuario.equipos = usuario.equipos.filter((e) => e.id !== equipoId);
            await this.usuarioRepository.save(usuario);

            // Cerrar el historial para el equipo
            await this.historialEquipoService.closeHistorial(
                usuarioId,
                equipoId,
            );
        }

        return usuario;
    }
}
