// src/jobs/exampleJob.ts
import cron from 'node-cron';

export const exampleJob = () => {
    cron.schedule('* * * * *', () => {
        console.log('Ejecutando exampleJob cada minuto');
    });
};
