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
        //origin: ["http://example.com", "https://anotherdomain.com"],
        //methods: ["GET", "POST"],
        //allowedHeaders: ["Content-Type", "Authorization"],
    }),
);
app.use(helmet());
app.use(morgan('dev'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);
app.use(errorHandler);

export default app;
