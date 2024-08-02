import { Repository } from 'typeorm';
import AppDataSource from '@/config/ormconfig';
import { Notificacion } from '@/entities/misc/NotificationEntity';
import { Usuario } from '@/entities/UsuarioEntity';
import { NotFoundError } from '@/middlewares/appError';

export class NotificacionService {
    private readonly notificacionRepository: Repository<Notificacion>;
    private readonly usuarioRepository: Repository<Usuario>;

    constructor() {
        this.notificacionRepository = AppDataSource.getRepository(Notificacion);
        this.usuarioRepository = AppDataSource.getRepository(Usuario);
    }

    async crearNotificacion(
        usuarioId: number,
        titulo: string,
        descripcion: string,
        enviadoPorId: number,
    ): Promise<Notificacion> {
        const usuario = await this.usuarioRepository.findOneBy({
            id: usuarioId,
        });
        if (!usuario) {
            throw new NotFoundError('Usuario no encontrado.');
        }

        const enviadoPor = await this.usuarioRepository.findOneBy({
            id: enviadoPorId,
        });
        if (!enviadoPor) {
            throw new NotFoundError(
                'Usuario que envía la notificación no encontrado.',
            );
        }

        const notificacion = this.notificacionRepository.create({
            titulo,
            descripcion,
            enviadoPor,
            usuario,
        });

        return await this.notificacionRepository.save(notificacion);
    }

    async obtenerNotificacionesPorUsuario(
        usuarioId: number,
    ): Promise<Notificacion[]> {
        return await this.notificacionRepository.find({
            where: { usuario: { id: usuarioId }, borrada: false },
        });
    }

    async marcarComoLeida(id: number): Promise<Notificacion | null> {
        const notificacion = await this.notificacionRepository.findOneBy({
            id,
        });
        if (!notificacion) {
            throw new NotFoundError('Notificación no encontrada.');
        }

        notificacion.leida = true;
        return await this.notificacionRepository.save(notificacion);
    }

    async borrarNotificacion(id: number): Promise<void> {
        const notificacion = await this.notificacionRepository.findOneBy({
            id,
        });
        if (!notificacion) {
            throw new NotFoundError('Notificación no encontrada.');
        }

        notificacion.borrada = true;
        await this.notificacionRepository.save(notificacion);
    }

    async eliminarNotificacionPermanente(id: number): Promise<void> {
        const result = await this.notificacionRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundError('Notificación no encontrada.');
        }
    }
}
