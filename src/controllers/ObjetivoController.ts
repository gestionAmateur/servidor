import { Request, Response } from 'express';
import { ObjetivoService } from '@/services/ObjetivoService';
import { NotFoundError } from '@/middlewares/appError';
import { resultHandler } from '@/middlewares/resultHandler';
import tryCatch from '@/utils/tryCatch';

const objetivoService = new ObjetivoService();

export class ObjetivoController {
    static createObjetivo = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const objetivo = await objetivoService.createObjetivo(req.body);
            resultHandler(
                { status: 201, success: true, result: objetivo },
                res,
            );
        },
    );

    static getObjetivoById = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const objetivo = await objetivoService.getObjetivoById(
                parseInt(req.params.id, 10),
            );
            if (!objetivo) {
                throw new NotFoundError('Objetivo no encontrado.');
            }
            resultHandler(
                { status: 200, success: true, result: objetivo },
                res,
            );
        },
    );

    static updateObjetivo = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const objetivo = await objetivoService.updateObjetivo(
                parseInt(req.params.id, 10),
                req.body,
            );
            if (!objetivo) {
                throw new NotFoundError('Objetivo no encontrado.');
            }
            resultHandler(
                { status: 200, success: true, result: objetivo },
                res,
            );
        },
    );

    static deleteObjetivo = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            await objetivoService.deleteObjetivo(parseInt(req.params.id, 10));
            resultHandler(
                {
                    status: 204,
                    success: true,
                    result: 'Objetivo eliminado con éxito.',
                },
                res,
            );
        },
    );

    static getAllObjetivos = tryCatch(
        async (_: Request, res: Response): Promise<void> => {
            const objetivos = await objetivoService.getAllObjetivos();
            resultHandler(
                { status: 200, success: true, result: objetivos },
                res,
            );
        },
    );
}
