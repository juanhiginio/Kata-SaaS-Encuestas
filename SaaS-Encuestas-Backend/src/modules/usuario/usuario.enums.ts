export const ROL_USUARIO = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export type RolUsuario = typeof ROL_USUARIO[keyof typeof ROL_USUARIO];

export const ESTADO_USUARIO = {
  ACTIVO: 'ACTIVO',
  INACTIVO: 'INACTIVO',
};

export type EstadoUsuario = typeof ESTADO_USUARIO[keyof typeof ESTADO_USUARIO];
