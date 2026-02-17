import AppError from '../../reutilizable/errores/AppError.js';

export default class ClienteService {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    async create(data) {
        const exists = await this.clienteRepository.findByDocumento(
            data.documentoIdentidad
        );

        if (exists) {
            throw new AppError('El cliente ya existe', 409);
        }

        return this.clienteRepository.create(data);
    }

    async findAll() {
        return this.clienteRepository.findAll();
    }

    async findById(id) {
        const cliente = await this.clienteRepository.findById(id);
        if (!cliente) {
            throw new AppError('Cliente no encontrado', 404);
        }
        return cliente;
    }

    async update(id, data) {
        await this.findById(id);
        return this.clienteRepository.update(id, data);
    }

    async patchCliente(id, payload) {
        if (!Object.keys(payload).length) {
            throw new BadRequestError('No se enviaron campos para actualizar');
        }

        const cliente = await this.clienteRepository.findById(id);

        if (!cliente) {
            throw new NotFoundError('Cliente no encontrado');
        }

        return this.clienteRepository.updateById(id, payload);
    }

    async delete(id) {
        await this.findById(id);
        return this.clienteRepository.softDelete(id);
    }
}
