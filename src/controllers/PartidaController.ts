import { Request, Response } from 'express';
import { PartidaService } from '@/services/PartidaService';
import { NotFoundError } from '@/middlewares/appError';
import { resultHandler } from '@/middlewares/resultHandler';
import tryCatch from '@/utils/tryCatch';

const partidaService = new PartidaService();

export class PartidaController {
    static createPartida = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const partida = await partidaService.createPartida(req.body);
            resultHandler({ status: 201, success: true, result: partida }, res);
        },
    );

    static getPartidaById = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const partida = await partidaService.getPartidaById(
                parseInt(req.params.id, 10),
            );
            if (!partida) {
                throw new NotFoundError('Partida no encontrada.');
            }
            resultHandler({ status: 200, success: true, result: partida }, res);
        },
    );

    static updatePartida = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const partida = await partidaService.updatePartida(
                parseInt(req.params.id, 10),
                req.body,
            );
            if (!partida) {
                throw new NotFoundError('Partida no encontrada.');
            }
            resultHandler({ status: 200, success: true, result: partida }, res);
        },
    );

    static deletePartida = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            await partidaService.deletePartida(parseInt(req.params.id, 10));
            resultHandler(
                {
                    status: 204,
                    success: true,
                    result: 'Partida eliminada con éxito.',
                },
                res,
            );
        },
    );

    static getAllPartidas = tryCatch(
        async (_: Request, res: Response): Promise<void> => {
            const partidas = await partidaService.getAllPartidas();
            resultHandler(
                { status: 200, success: true, result: partidas },
                res,
            );
        },
    );
}
