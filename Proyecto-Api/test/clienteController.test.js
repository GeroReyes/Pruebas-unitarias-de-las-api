import Cliente from '../models/clienteModel.js';
import { app } from '../index.js'; // Asegúrate de exportar `app` en tu archivo principal
import sinon from 'sinon';



let chai, expect;

describe('Pruebas de la API de clientes', () => {
    before(async () => {
        const chai = await import('chai');
        expect = chai.expect;
    });

    afterEach(() => {
        sinon.restore(); 
    });

    it('Debería obtener todos los clientes', async () => {
        sinon.stub(Cliente, 'findAll').resolves([
            {
                id_cliente: 1,
                nombre_cliente: 'Juan',
                primer_apellido: 'Perez',
                segundo_apellido: 'López',
                numero_telefono: '123456789',
                direccion: '123 Calle Falsa',
                usuario_id: 1,
                tipo_cliente_id: 1,
            },
        ]);

        const res = await chai.request(app).get('/api/clientes');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0].nombre_cliente).to.equal('Juan');
    });

    it('Debería obtener un cliente por ID', async () => {
        sinon.stub(Cliente, 'findByPk').resolves({
            id_cliente: 1,
            nombre_cliente: 'Juan',
            primer_apellido: 'Perez',
            segundo_apellido: 'López',
            numero_telefono: '123456789',
            direccion: '123 Calle Falsa',
            usuario_id: 1,
            tipo_cliente_id: 1,
        });

        const res = await chai.request(app).get('/api/clientes/1');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.nombre_cliente).to.equal('Juan');
    });

    it('Debería crear un nuevo cliente', async () => {
        const nuevoCliente = {
            nombre_cliente: 'Ana',
            primer_apellido: 'García',
            segundo_apellido: 'Ruiz',
            numero_telefono: '987654321',
            direccion: '456 Calle Verdadera',
            usuario_id: 2,
            tipo_cliente_id: 1,
        };

        sinon.stub(Cliente, 'create').resolves({ id_cliente: 2, ...nuevoCliente });

        const res = await chai.request(app).post('/api/clientes').send(nuevoCliente);
        expect(res).to.have.status(201);
        expect(res.body.nombre_cliente).to.equal('Ana');
    });

    it('Debería actualizar un cliente existente', async () => {
        const clienteActualizado = {
            nombre_cliente: 'Juan Actualizado',
            primer_apellido: 'Perez',
            segundo_apellido: 'López',
            numero_telefono: '123456789',
            direccion: '123 Calle Falsa',
            usuario_id: 1,
            tipo_cliente_id: 1,
        };

        sinon.stub(Cliente, 'update').resolves([1]); // Simulando que se actualizó un cliente

        const res = await chai.request(app).put('/api/clientes/1').send(clienteActualizado);
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Cliente actualizado correctamente');
    });

    it('Debería eliminar un cliente de forma lógica', async () => {
        sinon.stub(Cliente, 'destroy').resolves({ delete_at: new Date() });

        const res = await chai.request(app).delete('/api/clientes/1');
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Cliente eliminado correctamente');
    });
});
