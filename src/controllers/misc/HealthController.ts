import { Request, Response } from 'express';
import tryCatch from '@/utils/tryCatch';
import { resultHandler } from '@/middlewares/resultHandler';

export class HealthController {
    static checkHealth = tryCatch(
        async (_req: Request, res: Response): Promise<void> => {
            resultHandler({ status: 200, success: true, result: 'OK' }, res);
        },
    );
}
