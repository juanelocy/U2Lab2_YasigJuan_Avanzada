import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API_URL = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient) { }

  getUsuarioPorCedula(cedula: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${cedula}`);
  }

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(this.API_URL, usuario);
  }

  // Obtener todos los usuarios
  getUsuarios(): Observable<any> {
    return this.http.get(this.API_URL);
  }

  // Actualizar usuario
  actualizarUsuario(cedula: string, usuario: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${cedula}`, usuario);
  }

  // Eliminar usuario
  eliminarUsuario(cedula: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/${cedula}`);
  }

}
