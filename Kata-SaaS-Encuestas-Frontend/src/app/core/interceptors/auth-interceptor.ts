import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // Intercepta las solicitudes HTTP para agregar el token de autenticación
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');

    // Si hay un token, clona la solicitud y agrega el encabezado de autorización
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      // Continúa con la nueva solicitud modificada
      return next.handle(authReq);
    }

    // Si no hay token, continúa con la solicitud original
    return next.handle(req);
  }
}
