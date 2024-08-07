import { Request, Response } from 'express';
import axios from 'axios';
import { AuthService } from '@/services/misc/AuthService';
import { UsuarioService } from '@/services/UsuarioService';
import tryCatch from '@/utils/tryCatch';
import { sesionService } from '@/services/misc/SesionService';

const usuarioService = new UsuarioService();

export class AuthController {
    static sendCallback = tryCatch(
        async (_req: Request, res: Response): Promise<void> => {
            const redirectUri = `https://discord.com/oauth2/authorize?client_id=${
                process.env.DISCORD_CLIENT_ID
            }&response_type=code&redirect_uri=${encodeURIComponent(
                process.env.DISCORD_REDIRECT_URI!,
            )}&scope=identify%20email`;
            console.log(redirectUri);

            // Redirige al cliente directamente a Discord
            res.redirect(redirectUri);
        },
    );

    static callback = tryCatch(
        async (req: Request, res: Response): Promise<void> => {
            const { code } = req.query;

            // Verificar que `code` es un string
            if (typeof code !== 'string') {
                res.status(400).json({
                    success: false,
                    message: 'Invalid code parameter',
                });
                return;
            }

            try {
                // Intercambiar el código por un token de acceso
                const response = await axios.post(
                    'https://discord.com/api/oauth2/token',
                    new URLSearchParams({
                        client_id: process.env.DISCORD_CLIENT_ID!,
                        client_secret: process.env.DISCORD_CLIENT_SECRET!,
                        grant_type: 'authorization_code',
                        code: code,
                        redirect_uri: process.env.DISCORD_REDIRECT_URI!,
                        scope: 'identify email',
                    }),
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    },
                );

                const { access_token } = response.data;

                // Obtener información del usuario de Discord
                const userResponse = await axios.get(
                    'https://discord.com/api/v10/users/@me',
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    },
                );

                const {
                    id: discordId,
                    username: nombre,
                    email,
                    avatar: discordAvatar,
                } = userResponse.data;

                // Buscar al usuario por discordId
                const usuario =
                    await usuarioService.getUsuarioByDiscordId(discordId);
                let usuarioFinal;
                if (!usuario) {
                    // Crear un nuevo usuario si no existe
                    const usuarioCreado = await usuarioService.createUsuario({
                        discordId,
                        discordAvatar,
                        nombre,
                        email,
                    });
                    usuarioFinal = usuarioCreado;
                } else {
                    usuarioFinal = usuario;
                }

                // Generar un token para el usuario
                const token = AuthService.generateToken(usuarioFinal);

                const createdAt = Math.floor(Date.now() / 1000);
                const expiredAt = createdAt + 2592000;
                console.log(usuarioFinal);
                console.log(usuarioFinal['usuario'].id);
                await sesionService.createSesion({
                    usuario: { id: usuarioFinal['usuario'].id } as any,
                    token: token,
                    createdAt: createdAt,
                    expiredAt: expiredAt,
                });

                res.redirect(`http://localhost:5173?token=${token}`);
            } catch (error) {
                console.error('Error in callback:', error);
                res.status(500).send('Something went wrong');
            }
        },
    );
}
