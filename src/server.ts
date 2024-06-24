// src/server.ts
import app from './app';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT ?? 3000;

createConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => console.log(error));
