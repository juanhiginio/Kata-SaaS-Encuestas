export default class ClienteRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  create(data) {
    return this.prisma.cliente.create({ data });
  }

  findAll() {
    return this.prisma.cliente.findMany({
      where: { deletedAt: null },
    });
  }

  findById(id) {
    return this.prisma.cliente.findFirst({
      where: { idCliente: id, deletedAt: null },
    });
  }

  findByDocumento(documento) {
    return this.prisma.cliente.findUnique({
      where: { documentoIdentidad: documento },
    });
  }

  update(id, data) {
    return this.prisma.cliente.update({
      where: { idCliente: id },
      data,
    });
  }

  softDelete(id) {
    return this.prisma.cliente.update({
      where: { idCliente: id },
      data: { deletedAt: new Date() },
    });
  }
}
