import { Request, Response } from 'express';
import { CuentaInvocadorService } from '@/services/CuentaInvocadorService';
import { ValidationError, NotFoundError } from '@/middlewares/appError';
import { resultHandler } from '@/middlewares/resultHandler';
import tryCatch from '@/utils/tryCatch';

const cuentaInvocadorService = new CuentaInvocadorService();

export class CuentaInvocadorController {
    static createCuentaInvocador = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const data = req.body;
            if (!data) {
                throw new ValidationError(
                    'Datos de cuenta de invocador inválidos.',
                );
            }
            const cuentaInvocador =
                await cuentaInvocadorService.createCuentaInvocador(data);
            resultHandler(
                { status: 201, success: true, result: cuentaInvocador },
                res,
            );
        },
    );

    static getCuentaInvocadorById = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                throw new ValidationError('ID inválido.');
            }
            const cuentaInvocador =
                await cuentaInvocadorService.getCuentaInvocadorById(id);
            if (!cuentaInvocador) {
                throw new NotFoundError('Cuenta de invocador no encontrada.');
            }
            resultHandler(
                { status: 200, success: true, result: cuentaInvocador },
                res,
            );
        },
    );

    static updateCuentaInvocador = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const id = parseInt(req.params.id, 10);
            const data = req.body;
            if (isNaN(id)) {
                throw new ValidationError('ID inválido.');
            }
            const updatedCuentaInvocador =
                await cuentaInvocadorService.updateCuentaInvocador(id, data);
            if (!updatedCuentaInvocador) {
                throw new NotFoundError('Cuenta de invocador no encontrada.');
            }
            resultHandler(
                { status: 200, success: true, result: updatedCuentaInvocador },
                res,
            );
        },
    );

    static deleteCuentaInvocador = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const id = parseInt(req.params.id, 10);
            const token = req.headers['x-auth-token'] as string;
            if (isNaN(id)) {
                throw new ValidationError('ID inválido.');
            }
            if (!token) {
                throw new ValidationError('Token no proporcionado.');
            }
            await cuentaInvocadorService.deleteCuentaInvocador(id, token);
            resultHandler({ status: 204, success: true, result: 'Cuenta de invocador eliminada con éxito.' }, res);
        },
    );

    static getAllCuentaInvocadores = tryCatch(
        async (_: Request, res: Response): Promise<void> => {
            const cuentaInvocadores =
                await cuentaInvocadorService.getAllCuentaInvocadores();
            resultHandler(
                { status: 200, success: true, result: cuentaInvocadores },
                res,
            );
        },
    );

    static updateNombreYTagInvocador = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const { puuid } = req.params;

            if (!puuid) {
                throw new ValidationError('PUUID no proporcionado.');
            }

            const updatedCuentaInvocador = await cuentaInvocadorService.updateNombreYTagInvocador(puuid);

            if (!updatedCuentaInvocador) {
                throw new NotFoundError('Cuenta de invocador no encontrada.');
            }

            resultHandler(
                { status: 200, success: true, result: updatedCuentaInvocador },
                res,
            );
        }
    );
}
