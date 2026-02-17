export const toClienteResponse = (cliente) => ({
  id: cliente.idCliente,
  nombreCompleto: cliente.nombreCompleto,
  documentoIdentidad: cliente.documentoIdentidad,
  telefono: cliente.telefono,
  correoElectronico: cliente.correoElectronico,
  direccion: cliente.direccion,
  tipoCliente: cliente.tipoCliente,
  estado: cliente.estado,
  observaciones: cliente.observaciones,
  createdAt: cliente.createdAt,
  updatedAt: cliente.updatedAt,
});
