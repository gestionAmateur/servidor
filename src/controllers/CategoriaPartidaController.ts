import { Request, Response } from 'express';
import { CategoriaPartidaService } from '@/services/CategoriaPartidaService';
import { ValidationError, NotFoundError } from '@/middlewares/appError';
import { resultHandler } from '@/middlewares/resultHandler';
import tryCatch from '@/utils/tryCatch';

const categoriaPartidaService = new CategoriaPartidaService();

export class CategoriaPartidaController {
    static createCategoriaPartida = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const data = req.body;
            if (!data) {
                throw new ValidationError(
                    'Datos de categoría de partida inválidos.',
                );
            }
            const categoriaPartida =
                await categoriaPartidaService.createCategoriaPartida(data);
            resultHandler(
                { status: 201, success: true, result: categoriaPartida },
                res,
            );
        },
    );

    static getCategoriaPartidaById = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                throw new ValidationError('ID inválido.');
            }
            const categoriaPartida =
                await categoriaPartidaService.getCategoriaPartidaById(id);
            if (!categoriaPartida) {
                throw new NotFoundError('Categoría de partida no encontrada.');
            }
            resultHandler(
                { status: 200, success: true, result: categoriaPartida },
                res,
            );
        },
    );

    static updateCategoriaPartida = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const id = parseInt(req.params.id, 10);
            const data = req.body;
            if (isNaN(id)) {
                throw new ValidationError('ID inválido.');
            }
            const updatedCategoriaPartida =
                await categoriaPartidaService.updateCategoriaPartida(id, data);
            if (!updatedCategoriaPartida) {
                throw new NotFoundError('Categoría de partida no encontrada.');
            }
            resultHandler(
                { status: 200, success: true, result: updatedCategoriaPartida },
                res,
            );
        },
    );

    static deleteCategoriaPartida = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                throw new ValidationError('ID inválido.');
            }
            await categoriaPartidaService.deleteCategoriaPartida(id);
            resultHandler(
                {
                    status: 204,
                    success: true,
                    result: 'Categoría de partida eliminada con éxito.',
                },
                res,
            );
        },
    );

    static getAllCategoriaPartidas = tryCatch(
        async (_: Request, res: Response): Promise<void> => {
            const categoriaPartidas =
                await categoriaPartidaService.getAllCategoriaPartidas();
            resultHandler(
                { status: 200, success: true, result: categoriaPartidas },
                res,
            );
        },
    );
}
