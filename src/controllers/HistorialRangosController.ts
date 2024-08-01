import { Request, Response } from 'express';
import { HistorialRangosService } from '@/services/HistorialRangosService';
import { CuentaInvocadorService } from '@/services/CuentaInvocadorService';
import { ValidationError, NotFoundError } from '@/middlewares/appError';
import { resultHandler } from '@/middlewares/resultHandler';
import tryCatch from '@/utils/tryCatch';

const historialRangosService = new HistorialRangosService();
const cuentaInvocadorService = new CuentaInvocadorService();

export class HistorialRangosController {
    static createOrUpdateHistorialRangos = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const { id } = req.params; // Ahora `puuid` se obtiene de los parámetros de la URL
            if (!id) {
                throw new ValidationError('Puuid es requerido.');
            }

            const cuenta =
                await cuentaInvocadorService.getCuentaInvocadorByRiotId(id);
            console.log(cuenta);
            // Llama al servicio para crear o actualizar
            const historialRangos =
                await historialRangosService.createOrUpdateHistorialRangos(
                    cuenta!,
                );
            resultHandler(
                { status: 200, success: true, result: historialRangos }, // Código 200 OK para PUT
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
