// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './routes/admin.routes';
import cashierRoutes from './routes/cashier.routes';
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', adminRoutes);
app.use('/api', cashierRoutes);
app.use('/', (req, res) => {
    res.send('Hello, World Salvus BE Test!');
});

export default app;
