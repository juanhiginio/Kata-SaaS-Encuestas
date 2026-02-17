import { Router } from 'express';

import usuarioRoutes from './modules/usuario/usuario.routes';
import formularioRoutes from './modules/formulario/formulario.routes';
import authRoutes from "./modules/auth/auth.routes";

export default function routes(app: Router) {
    app.use('/api/usuarios', usuarioRoutes);
    app.use('/api/formularios', formularioRoutes);
    app.use("/api/auth", authRoutes);
}
