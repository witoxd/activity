import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'http://localhost:4000'; // Cambia por tu URL de autenticación.

  constructor(private http: HttpClient) {}

  /**
   * Realizar el inicio de sesión
   * @param username Nombre de usuario
   * @param password Contraseña
   */
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(`${this.apiUrl}/login`, body);
  }
}


