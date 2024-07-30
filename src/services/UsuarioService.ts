import { Repository } from 'typeorm';
import AppDataSource from '@/config/ormconfig';
import { Usuario } from '@/entities/UsuarioEntity';
import { HistorialEquipo } from '@/entities/HistorialEquipoEntity';
import { sesionService } from './misc/SesionService';

export class UsuarioService {
    private readonly usuarioRepository: Repository<Usuario>;
    private readonly historialEquipoRepository: Repository<HistorialEquipo>;

    constructor() {
        this.usuarioRepository = AppDataSource.getRepository(Usuario);
        this.historialEquipoRepository =
            AppDataSource.getRepository(HistorialEquipo);
    }

    async createUsuario(data: Partial<Usuario>): Promise<Usuario> {
        const usuario = this.usuarioRepository.create(data);
        return await this.usuarioRepository.save(usuario);
    }

    async getUsuarioById(id: number): Promise<Usuario | null> {
        return await this.usuarioRepository.findOne({
            where: { id },
            relations: ['cuentasInvocador', 'equipoActual', 'historial.equipo'],
        });
    }

    async getUsuarioByDiscordId(discordId: string): Promise<Usuario | null> {
        return await this.usuarioRepository.findOne({
            where: { discordId },
            relations: ['cuentasInvocador', 'equipoActual', 'historial.equipo'],
        });
    }

    async getUsuarioDetails(id: number): Promise<any> {
        const usuario = await this.usuarioRepository.findOne({
            where: { id },
            relations: ['cuentasInvocador', 'cuentasInvocador.historialRangos'],
        });
    
        if (!usuario) {
            return null;
        }
    
        const equiposHistorial = await this.historialEquipoRepository.find({
            where: { usuario: { id } },
            relations: ['equipo'],
        });
    
        const equipos = equiposHistorial.map((historial) => historial.equipo);

        
    
        return {
            usuario: {
                ...usuario,
                cuentasInvocador: usuario.cuentasInvocador,
                equipoActual: usuario.equipoActual,
                equiposHistorial: equipos,
            },
        };
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
        return await this.usuarioRepository.find();
    }

    async getUsuarioDetailsByToken(token: string): Promise<any> {
        const sesion = await sesionService.getSesion(token);

        if (!sesion || !sesion.usuario) {
            return null;
        }

        return await this.getUsuarioDetails(sesion.usuario.id);
    }
}
