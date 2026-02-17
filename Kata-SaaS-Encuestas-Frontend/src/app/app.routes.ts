import { Routes } from '@angular/router';
import { Formularios } from './pages/formularios/formularios';
import { AuthGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    // Protege la ruta de formularios con el AuthGuard
    { path: 'formularios', component: Formularios, canActivate: [AuthGuard] },
];
