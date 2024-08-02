import { Request, Response } from 'express';
import { NotificacionService } from '@/services/misc/NotificationSerive';
import { NotFoundError } from '@/middlewares/appError';
import { resultHandler } from '@/middlewares/resultHandler';
import tryCatch from '@/utils/tryCatch';

const notificacionService = new NotificacionService();

export class NotificacionController {
    static crearNotificacion = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const { usuarioId, titulo, descripcion, enviadoPorId } = req.body;
            const notificacion = await notificacionService.crearNotificacion(usuarioId, titulo, descripcion, enviadoPorId);
            resultHandler({ status: 201, success: true, result: notificacion }, res);
        },
    );

    static obtenerNotificacionesPorUsuario = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const usuarioId = parseInt(req.params.usuarioId, 10);
            const notificaciones = await notificacionService.obtenerNotificacionesPorUsuario(usuarioId);
            resultHandler({ status: 200, success: true, result: notificaciones }, res);
        },
    );

    static marcarComoLeida = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const id = parseInt(req.params.id, 10);
            const notificacion = await notificacionService.marcarComoLeida(id);
            if (!notificacion) {
                throw new NotFoundError('Notificación no encontrada.');
            }
            resultHandler({ status: 200, success: true, result: notificacion }, res);
        },
    );

    static borrarNotificacion = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const id = parseInt(req.params.id, 10);
            await notificacionService.borrarNotificacion(id);
            resultHandler({ status: 200, success: true, result: 'Notificación marcada como borrada.' }, res);
        },
    );

    static eliminarNotificacionPermanente = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const id = parseInt(req.params.id, 10);
            await notificacionService.eliminarNotificacionPermanente(id);
            resultHandler({ status: 204, success: true, result: 'Notificación eliminada permanentemente.' }, res);
        },
    );
}
