import 'dotenv/config';

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

import router from '@/routes/index';
import errorHandler from '@/middlewares/errorHandler';

const app = express();

const swaggerDocument = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'swagger.json'), 'utf8'),
);

app.use(express.json());
app.use(
    cors({
        // origin: '*', // Permite solicitudes desde el frontend en desarrollo
        // methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permite métodos específicos
        // allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'], // Permite encabezados específicos
    }),
);
app.use(helmet());
app.use(morgan('dev'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);
app.use(errorHandler);

export default app;
