import { Request, Response } from 'express';
import { UsuarioService } from '@/services/UsuarioService';
import { NotFoundError } from '@/middlewares/appError';
import { resultHandler } from '@/middlewares/resultHandler';
import tryCatch from '@/utils/tryCatch';

const usuarioService = new UsuarioService();

export class UsuarioController {
    static createUsuario = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const usuario = await usuarioService.createUsuario(req.body);
            resultHandler({ status: 201, success: true, result: usuario }, res);
        },
    );

    static getUsuarioById = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const usuario = await usuarioService.getUsuarioById(
                parseInt(req.params.id, 10),
            );
            if (!usuario) {
                throw new NotFoundError('Usuario no encontrado.');
            }
            resultHandler({ status: 200, success: true, result: usuario }, res);
        },
    );

    static getUsuarioByNombre = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const usuario = await usuarioService.getUsuarioByNombre(
                req.params.nombre,
            );
            if (!usuario) {
                throw new NotFoundError('Usuario no encontrado.');
            }
            resultHandler({ status: 200, success: true, result: usuario }, res);
        },
    );

    static updateUsuario = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const usuario = await usuarioService.updateUsuario(
                parseInt(req.params.id, 10),
                req.body,
            );
            if (!usuario) {
                throw new NotFoundError('Usuario no encontrado.');
            }
            resultHandler({ status: 200, success: true, result: usuario }, res);
        },
    );

    static deleteUsuario = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            await usuarioService.deleteUsuario(parseInt(req.params.id, 10));
            resultHandler(
                {
                    status: 204,
                    success: true,
                    result: 'Usuario eliminado con éxito.',
                },
                res,
            );
        },
    );

    static getAllUsuarios = tryCatch(
        async (_: Request, res: Response): Promise<void> => {
            const usuarios = await usuarioService.getAllUsuarios();
            resultHandler(
                { status: 200, success: true, result: usuarios },
                res,
            );
        },
    );

    static getUsuarioDetailsByToken = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const token = req.params.token;

            if (!token) {
                resultHandler(
                    {
                        status: 400,
                        success: false,
                        result: 'Token is required',
                    },
                    res,
                );
                return;
            }

            const usuarioDetails =
                await usuarioService.getUsuarioDetailsByToken(token);

            if (!usuarioDetails) {
                throw new NotFoundError('Usuario no encontrado.');
            }

            resultHandler(
                { status: 200, success: true, result: usuarioDetails },
                res,
            );
        },
    );

    static addEquipoToUsuario = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const usuarioId = parseInt(req.params.usuarioId, 10);
            const equipoId = parseInt(req.params.equipoId, 10);
            const usuario = await usuarioService.addEquipoToUsuario(
                usuarioId,
                equipoId,
            );
            resultHandler({ status: 200, success: true, result: usuario }, res);
        },
    );

    static removeEquipoFromUsuario = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const usuarioId = parseInt(req.params.usuarioId, 10);
            const equipoId = parseInt(req.params.equipoId, 10);
            const usuario = await usuarioService.removeEquipoFromUsuario(
                usuarioId,
                equipoId,
            );
            resultHandler({ status: 200, success: true, result: usuario }, res);
        },
    );
}
