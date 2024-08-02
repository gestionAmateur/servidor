import { Request, Response } from 'express';
import { EquipoCompetitivoService } from '@/services/EquipoCompetitivoService';
import { ValidationError, NotFoundError } from '@/middlewares/appError';
import { resultHandler } from '@/middlewares/resultHandler';
import tryCatch from '@/utils/tryCatch';

const equipoService = new EquipoCompetitivoService();

export class EquipoCompetitivoController {
    static createEquipoCompetitivo = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const data = req.body;
            if (!data) {
                throw new ValidationError(
                    'Datos de equipo competitivo inválidos.',
                );
            }
            const equipoCompetitivo =
                await equipoService.createEquipoCompetitivo(data);
            resultHandler(
                { status: 201, success: true, result: equipoCompetitivo },
                res,
            );
        },
    );

    static getEquipoCompetitivoById = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                throw new ValidationError('ID inválido.');
            }
            const equipoCompetitivo =
                await equipoService.getEquipoCompetitivoById(id);
            if (!equipoCompetitivo) {
                throw new NotFoundError('Equipo competitivo no encontrado.');
            }
            resultHandler(
                { status: 200, success: true, result: equipoCompetitivo },
                res,
            );
        },
    );

    static updateEquipoCompetitivo = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const id = parseInt(req.params.id, 10);
            const data = req.body;
            if (isNaN(id)) {
                throw new ValidationError('ID inválido.');
            }
            const updatedEquipoCompetitivo =
                await equipoService.updateEquipoCompetitivo(id, data);
            if (!updatedEquipoCompetitivo) {
                throw new NotFoundError('Equipo competitivo no encontrado.');
            }
            resultHandler(
                {
                    status: 200,
                    success: true,
                    result: updatedEquipoCompetitivo,
                },
                res,
            );
        },
    );

    static deleteEquipoCompetitivo = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                throw new ValidationError('ID inválido.');
            }
            await equipoService.deleteEquipoCompetitivo(id);
            resultHandler(
                {
                    status: 204,
                    success: true,
                    result: 'Equipo competitivo eliminado con éxito.',
                },
                res,
            );
        },
    );

    static getAllEquipoCompetitivos = tryCatch(
        async (_: Request, res: Response): Promise<void> => {
            const equiposCompetitivos =
                await equipoService.getAllEquipoCompetitivos();
            resultHandler(
                { status: 200, success: true, result: equiposCompetitivos },
                res,
            );
        },
    );
}
