import { Router } from 'express';
import usuarioRoutes from './modules/usuario/usuario.routes';

export default function routes(app: Router) {
    app.use('/api/usuarios', usuarioRoutes);
}
