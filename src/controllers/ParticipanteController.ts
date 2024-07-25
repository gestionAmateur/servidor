import { Request, Response } from 'express';
import { ParticipanteService } from '@/services/ParticipanteService';
import { NotFoundError } from '@/middlewares/appError';
import { resultHandler } from '@/middlewares/resultHandler';
import tryCatch from '@/utils/tryCatch';

const participanteService = new ParticipanteService();

export class ParticipanteController {
    static createParticipante = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const participante = await participanteService.createParticipante(
                req.body,
            );
            resultHandler(
                { status: 201, success: true, result: participante },
                res,
            );
        },
    );

    static getParticipanteById = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const participante = await participanteService.getParticipanteById(
                parseInt(req.params.id, 10),
            );
            if (!participante) {
                throw new NotFoundError('Participante no encontrado.');
            }
            resultHandler(
                { status: 200, success: true, result: participante },
                res,
            );
        },
    );

    static updateParticipante = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const participante = await participanteService.updateParticipante(
                parseInt(req.params.id, 10),
                req.body,
            );
            if (!participante) {
                throw new NotFoundError('Participante no encontrado.');
            }
            resultHandler(
                { status: 200, success: true, result: participante },
                res,
            );
        },
    );

    static deleteParticipante = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            await participanteService.deleteParticipante(
                parseInt(req.params.id, 10),
            );
            resultHandler(
                {
                    status: 204,
                    success: true,
                    result: 'Participante eliminado con éxito.',
                },
                res,
            );
        },
    );

    static getAllParticipantes = tryCatch(
        async (_: Request, res: Response): Promise<void> => {
            const participantes =
                await participanteService.getAllParticipantes();
            resultHandler(
                { status: 200, success: true, result: participantes },
                res,
            );
        },
    );
}
