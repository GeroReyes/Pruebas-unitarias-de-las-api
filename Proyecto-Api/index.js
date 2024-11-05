import express from 'express';
import clienteRoutes from './routes/clienteRoutes.js';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api', clienteRoutes);

// Puerto desde variables de entorno o por defecto en 3000
const PORT = process.env.PORT || 3000;

// Solo inicia el servidor si no está en modo de prueba
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Exportar app para pruebas
export { app };
