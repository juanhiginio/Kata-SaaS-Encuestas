import { toClienteResponse } from './cliente.mapper.js';
import { clientePatchSchema } from './cliente.schema.js';


export default class ClienteController {
    constructor(clienteService) {
        this.clienteService = clienteService;
    }

    create = async (req, res, next) => {
        try {
            const cliente = await this.clienteService.create(req.body);
            res.status(201).json(toClienteResponse(cliente));
        } catch (error) {
            next(error);
        }
    };

    findAll = async (req, res, next) => {
        try {
            const clientes = await this.clienteService.findAll();
            res.json(clientes.map(toClienteResponse));
        } catch (error) {
            next(error);
        }
    };

    findById = async (req, res, next) => {
        try {
            const cliente = await this.clienteService.findById(
                Number(req.params.id)
            );
            res.json(toClienteResponse(cliente));
        } catch (error) {
            next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            const cliente = await this.clienteService.update(
                Number(req.params.id),
                req.body
            );
            res.json(toClienteResponse(cliente));
        } catch (error) {
            next(error);
        }
    };

    patch = async (req, res, next) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                throw new ValidationError('ID inválido');
            }

            const data = clientePatchSchema.parse(req.body);

            const clienteActualizado = await this.clienteService.patchCliente(id, data);

            res.status(200).json(
                toClienteResponse(clienteActualizado)
            );
        } catch (error) {
            next(error);
        }
    };

    delete = async (req, res, next) => {
        try {
            await this.clienteService.delete(Number(req.params.id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
