import { Request, Response } from 'express';
import { BanService } from '@/services/BanService';
import { ValidationError, NotFoundError } from '@/middlewares/appError';
import { resultHandler } from '@/middlewares/resultHandler';
import tryCatch from '@/utils/tryCatch';

const banService = new BanService();

export class BanController {
    static createBan = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const data = req.body;
            if (!data) {
                throw new ValidationError('Datos de ban inválidos.');
            }
            const ban = await banService.createBan(data);
            resultHandler({ status: 201, success: true, result: ban }, res);
        },
    );

    static getBanById = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                throw new ValidationError('ID inválido.');
            }
            const ban = await banService.getBanById(id);
            if (!ban) {
                throw new NotFoundError('Ban no encontrado.');
            }
            resultHandler({ status: 200, success: true, result: ban }, res);
        },
    );

    static updateBan = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const id = parseInt(req.params.id, 10);
            const data = req.body;
            if (isNaN(id)) {
                throw new ValidationError('ID inválido.');
            }
            const updatedBan = await banService.updateBan(id, data);
            if (!updatedBan) {
                throw new NotFoundError('Ban no encontrado.');
            }
            resultHandler(
                { status: 200, success: true, result: updatedBan },
                res,
            );
        },
    );

    static deleteBan = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                throw new ValidationError('ID inválido.');
            }
            await banService.deleteBan(id);
            resultHandler({ status: 204, success: true, result: null }, res);
        },
    );

    static getAllBans = tryCatch(
        async (_: Request, res: Response): Promise<void> => {
            const bans = await banService.getAllBans();
            resultHandler({ status: 200, success: true, result: bans }, res);
        },
    );
}
