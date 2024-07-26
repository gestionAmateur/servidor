import express from 'express';
import { UsuarioController } from '@/controllers/UsuarioController';
import { PartidaController } from '@/controllers/PartidaController';
import { ParticipanteController } from '@/controllers/ParticipanteController';
import { ObjetivoController } from '@/controllers/ObjetivoController';
import { HistorialEquipoController } from '@/controllers/HistorialEquipoController';

import { AuthController } from '@/controllers/misc/AuthController';
import { authMiddleware } from '@/middlewares/auth';
import { HealthController } from '@/controllers/misc/HealthController';

const router = express.Router();

router.get('/health', HealthController.checkHealth);

router.post('/usuarios', authMiddleware, UsuarioController.createUsuario);
router.get('/usuarios/:id', authMiddleware, UsuarioController.getUsuarioById);
router.put('/usuarios/:id', authMiddleware, UsuarioController.updateUsuario);
router.delete('/usuarios/:id', authMiddleware, UsuarioController.deleteUsuario);
router.get('/usuarios', authMiddleware, UsuarioController.getAllUsuarios);

router.get(
    '/usuarios/detalles/:token',
    UsuarioController.getUsuarioDetailsByToken,
);

router.post('/partidas', authMiddleware, PartidaController.createPartida);
router.get('/partidas/:id', authMiddleware, PartidaController.getPartidaById);
router.put('/partidas/:id', authMiddleware, PartidaController.updatePartida);
router.delete('/partidas/:id', authMiddleware, PartidaController.deletePartida);
router.get('/partidas', authMiddleware, PartidaController.getAllPartidas);

router.post(
    '/participantes',
    authMiddleware,
    ParticipanteController.createParticipante,
);
router.get(
    '/participantes/:id',
    authMiddleware,
    ParticipanteController.getParticipanteById,
);
router.put(
    '/participantes/:id',
    authMiddleware,
    ParticipanteController.updateParticipante,
);
router.delete(
    '/participantes/:id',
    authMiddleware,
    ParticipanteController.deleteParticipante,
);
router.get(
    '/participantes',
    authMiddleware,
    ParticipanteController.getAllParticipantes,
);

router.post('/objetivos', authMiddleware, ObjetivoController.createObjetivo);
router.get(
    '/objetivos/:id',
    authMiddleware,
    ObjetivoController.getObjetivoById,
);
router.put('/objetivos/:id', authMiddleware, ObjetivoController.updateObjetivo);
router.delete(
    '/objetivos/:id',
    authMiddleware,
    ObjetivoController.deleteObjetivo,
);
router.get('/objetivos', authMiddleware, ObjetivoController.getAllObjetivos);

router.post(
    '/historial-equipos',
    authMiddleware,
    HistorialEquipoController.createHistorialEquipo,
);
router.get(
    '/historial-equipos/:id',
    authMiddleware,
    HistorialEquipoController.getHistorialEquipoById,
);
router.put(
    '/historial-equipos/:id',
    authMiddleware,
    HistorialEquipoController.updateHistorialEquipo,
);
router.delete(
    '/historial-equipos/:id',
    authMiddleware,
    HistorialEquipoController.deleteHistorialEquipo,
);
router.get(
    '/historial-equipos',
    authMiddleware,
    HistorialEquipoController.getAllHistorialEquipos,
);

router.get('/registro', AuthController.sendCallback);
router.get('/callback', AuthController.callback);

export default router;
