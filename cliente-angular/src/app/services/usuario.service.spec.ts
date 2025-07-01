import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API_URL = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient) { }

  // Obtener usuario por cédula
  getUsuarioPorCedula(cedula: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${cedula}`);
  }

  // Crear nuevo usuario
  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(this.API_URL, usuario);
  }

  // Actualizar usuario
  actualizarUsuario(cedula: string, usuario: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${cedula}`, usuario);
  }

  // Eliminar usuario
  eliminarUsuario(cedula: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${cedula}`);
  }

  // Obtener todos (opcional si tienes esa ruta en tu API)
  getUsuarios(): Observable<any> {
    return this.http.get(this.API_URL);
  }
}
