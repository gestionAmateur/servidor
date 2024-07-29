import { Request, Response } from 'express';
import { HistorialRangosService } from '@/services/HistorialRangosService';
import { ValidationError, NotFoundError } from '@/middlewares/appError';
import { resultHandler } from '@/middlewares/resultHandler';
import tryCatch from '@/utils/tryCatch';

const historialRangosService = new HistorialRangosService();

export class HistorialRangosController {
    static createHistorialRangos = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const data = req.body;
            if (!data) {
                throw new ValidationError(
                    'Datos de historial de rangos inválidos.',
                );
            }

            const historialRangos =
                await historialRangosService.createHistorialRangos(data);
            resultHandler(
                { status: 201, success: true, result: historialRangos },
                res,
            );
        },
    );

    static getHistorialRangosById = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                throw new ValidationError('ID inválido.');
            }

            const historialRangos =
                await historialRangosService.getHistorialRangosById(id);
            if (!historialRangos) {
                throw new NotFoundError('Historial de rangos no encontrado.');
            }

            resultHandler(
                { status: 200, success: true, result: historialRangos },
                res,
            );
        },
    );

    static updateHistorialRangos = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const id = parseInt(req.params.id, 10);
            const data = req.body;
            if (isNaN(id)) {
                throw new ValidationError('ID inválido.');
            }

            const updatedHistorialRangos =
                await historialRangosService.updateHistorialRangos(id, data);
            if (!updatedHistorialRangos) {
                throw new NotFoundError('Historial de rangos no encontrado.');
            }

            resultHandler(
                { status: 200, success: true, result: updatedHistorialRangos },
                res,
            );
        },
    );

    static deleteHistorialRangos = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                throw new ValidationError('ID inválido.');
            }

            await historialRangosService.deleteHistorialRangos(id);
            resultHandler(
                {
                    status: 204,
                    success: true,
                    result: 'Historial de rangos eliminado con éxito.',
                },
                res,
            );
        },
    );

    static getAllHistorialRangos = tryCatch(
        async (_: Request, res: Response): Promise<void> => {
            const historialRangos =
                await historialRangosService.getAllHistorialRangos();
            resultHandler(
                { status: 200, success: true, result: historialRangos },
                res,
            );
        },
    );
}
