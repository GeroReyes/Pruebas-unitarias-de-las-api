import express from 'express';
import ClienteController from '../controller/clienteController.js';

const router = express.Router();

// Obtener todos los clientes
router.get('/cliente', ClienteController.getAllcliente);

// Obtener un cliente por ID
router.get('/cliente/:id', ClienteController.getclienteById);

// Crear un nuevo cliente
router.post('/cliente', ClienteController.createcliente);

// Actualizar un cliente por ID
router.put('/cliente/:id', ClienteController.updatecliente);

// Eliminar un cliente por ID (soft delete)
router.delete('/cliente/:id', ClienteController.deletecliente);

// Descargar listado de clientes en Excel
router.get('/clientes/excel', ClienteController.downloadClientesExcel);

export default router;
