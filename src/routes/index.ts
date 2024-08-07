import express from 'express';
import { UsuarioController } from '@/controllers/UsuarioController';
import { PartidaController } from '@/controllers/PartidaController';
import { ParticipanteController } from '@/controllers/ParticipanteController';
import { ObjetivoController } from '@/controllers/ObjetivoController';
import { HistorialEquipoController } from '@/controllers/HistorialEquipoController';
import { CuentaInvocadorController } from '@/controllers/CuentaInvocadorController';
import { EquipoCompetitivoController } from '@/controllers/EquipoCompetitivoController';

import { AuthController } from '@/controllers/misc/AuthController';
import { authMiddleware } from '@/middlewares/auth';
import { HealthController } from '@/controllers/misc/HealthController';
import { HistorialRangosController } from '@/controllers/HistorialRangosController';
import { NotificacionController } from '@/controllers/misc/NotificationController';

const router = express.Router();

router.get('/health', HealthController.checkHealth);

router.post('/usuarios', authMiddleware, UsuarioController.createUsuario);
router.get('/usuarios/:id', authMiddleware, UsuarioController.getUsuarioById);
router.get(
    '/usuarios/nombre/:nombre',
    authMiddleware,
    UsuarioController.getUsuarioByNombre,
);
router.post(
    '/usuarios/:usuarioId/equipos/:equipoId',
    authMiddleware,
    UsuarioController.addEquipoToUsuario,
);
router.delete(
    '/usuarios/:usuarioId/equipos/:equipoId',
    authMiddleware,
    UsuarioController.removeEquipoFromUsuario,
);
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
    '/equipos',
    authMiddleware,
    EquipoCompetitivoController.createEquipoCompetitivo,
);
router.get(
    '/equipos/:id',
    authMiddleware,
    EquipoCompetitivoController.getEquipoCompetitivoById,
);
router.put(
    '/equipos/:id',
    authMiddleware,
    EquipoCompetitivoController.updateEquipoCompetitivo,
);
router.delete(
    '/equipos/:id',
    authMiddleware,
    EquipoCompetitivoController.deleteEquipoCompetitivo,
);
router.get(
    '/equipos',
    authMiddleware,
    EquipoCompetitivoController.getAllEquipoCompetitivos,
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

router.post(
    '/cuentas-invocador',
    authMiddleware,
    CuentaInvocadorController.createCuentaInvocador,
);
router.get(
    '/cuentas-invocador/:id',
    authMiddleware,
    CuentaInvocadorController.getCuentaInvocadorById,
);
router.put(
    '/cuentas-invocador/:id',
    authMiddleware,
    CuentaInvocadorController.updateCuentaInvocador,
);
router.delete(
    '/cuentas-invocador/:id',
    authMiddleware,
    CuentaInvocadorController.deleteCuentaInvocador,
);
router.get(
    '/cuentas-invocador',
    authMiddleware,
    CuentaInvocadorController.getAllCuentaInvocadores,
);
router.put(
    '/cuentas-invocador/update/:puuid',
    authMiddleware,
    CuentaInvocadorController.updateNombreYTagInvocador,
);

router.put(
    '/historial-rangos/:id',
    HistorialRangosController.createOrUpdateHistorialRangos,
);
router.get(
    '/historial-rangos/:id',
    HistorialRangosController.getHistorialRangosById,
);
router.delete(
    '/historial-rangos/:id',
    HistorialRangosController.deleteHistorialRangos,
);
router.get(
    '/historial-rangos',
    HistorialRangosController.getAllHistorialRangos,
);

router.post(
    '/notificaciones',
    authMiddleware,
    NotificacionController.crearNotificacion,
);
router.get(
    '/notificaciones/usuario/:usuarioId',
    authMiddleware,
    NotificacionController.obtenerNotificacionesPorUsuario,
);
router.put(
    '/notificaciones/:id/leida',
    authMiddleware,
    NotificacionController.marcarComoLeida,
);
router.put(
    '/notificaciones/:id/borrada',
    authMiddleware,
    NotificacionController.borrarNotificacion,
);
router.delete(
    '/notificaciones/:id',
    authMiddleware,
    NotificacionController.eliminarNotificacionPermanente,
);

router.get('/registro', AuthController.sendCallback);
router.get('/callback', AuthController.callback);

export default router;
