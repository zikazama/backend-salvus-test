// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './routes/admin.routes';

const app = express();

app.use(bodyParser.json());
app.use('/api', adminRoutes);
// app.use('/api', cashierRoutes);

export default app;
