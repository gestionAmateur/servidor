import { Request, Response } from 'express';
import { HistorialEquipoService } from '@/services/HistorialEquipoService';
import { NotFoundError } from '@/middlewares/appError';
import { resultHandler } from '@/middlewares/resultHandler';
import tryCatch from '@/utils/tryCatch';

const historialEquipoService = new HistorialEquipoService();

export class HistorialEquipoController {
    static createHistorialEquipo = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const historialEquipo =
                await historialEquipoService.createHistorialEquipo(req.body);
            resultHandler(
                { status: 201, success: true, result: historialEquipo },
                res,
            );
        },
    );

    static getHistorialEquipoById = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const historialEquipo =
                await historialEquipoService.getHistorialEquipoById(
                    parseInt(req.params.id, 10),
                );
            if (!historialEquipo) {
                throw new NotFoundError('Historial de equipo no encontrado.');
            }
            resultHandler(
                { status: 200, success: true, result: historialEquipo },
                res,
            );
        },
    );

    static updateHistorialEquipo = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const historialEquipo =
                await historialEquipoService.updateHistorialEquipo(
                    parseInt(req.params.id, 10),
                    req.body,
                );
            if (!historialEquipo) {
                throw new NotFoundError('Historial de equipo no encontrado.');
            }
            resultHandler(
                { status: 200, success: true, result: historialEquipo },
                res,
            );
        },
    );

    static deleteHistorialEquipo = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            await historialEquipoService.deleteHistorialEquipo(
                parseInt(req.params.id, 10),
            );
            resultHandler(
                {
                    status: 204,
                    success: true,
                    result: 'Historial de equipo eliminado con éxito.',
                },
                res,
            );
        },
    );

    static getAllHistorialEquipos = tryCatch(
        async (_: Request, res: Response): Promise<void> => {
            const historialEquipos =
                await historialEquipoService.getAllHistorialEquipos();
            resultHandler(
                { status: 200, success: true, result: historialEquipos },
                res,
            );
        },
    );
}
