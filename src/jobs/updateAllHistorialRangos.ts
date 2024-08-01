import { CuentaInvocadorService } from '@/services/CuentaInvocadorService';
import { HistorialRangosService } from '@/services/HistorialRangosService';
import cron from 'node-cron';

export const updateAllHistorialRangos = () => {
    cron.schedule('0 3 * * */1', async () => {
        const cuentaInvocadorService = new CuentaInvocadorService();
        const historialRangosService = new HistorialRangosService();

        try {
            const cuentas =
                await cuentaInvocadorService.getAllCuentaInvocadores();
            for (const cuenta of cuentas) {
                console.log(cuenta);
                await historialRangosService.createOrUpdateHistorialRangos(
                    cuenta,
                );
            }
            console.log(
                'Historial de rangos actualizado para todas las cuentas de invocador.',
            );
        } catch (error) {
            console.error('Error al actualizar el historial de rangos:', error);
        }
    });
};
