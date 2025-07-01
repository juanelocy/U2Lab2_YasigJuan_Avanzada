import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FormsModule, CommonModule]
})
export class AppComponent implements OnInit {

  usuarios: any[] = [];
  nuevoUsuario = { cedula: '', nombre: '', correo: '' };
  cedula = '';
  usuario: any = null;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
  this.usuarioService.getUsuarios().subscribe({
    next: (data) => {
      console.log('Datos recibidos:', data); // 👈 Agrega esto
      this.usuarios = data;
    },
    error: (err) => console.error('Error al obtener usuarios:', err)
  });
}


  crear() {
    this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe({
      next: () => {
        this.cargarUsuarios();
        this.nuevoUsuario = { cedula: '', nombre: '', correo: '' };
      }
    });
  }

  eliminar(cedula: string) {
    this.usuarioService.eliminarUsuario(cedula).subscribe({
      next: () => this.cargarUsuarios()
    });
  }

  editar(usuario: any) {
    this.nuevoUsuario = { ...usuario };
  }

  actualizar() {
    this.usuarioService.actualizarUsuario(this.nuevoUsuario.cedula, this.nuevoUsuario).subscribe({
      next: () => {
        this.cargarUsuarios();
        this.nuevoUsuario = { cedula: '', nombre: '', correo: '' };
      }
    });
  }

  buscar() {
    this.usuarioService.getUsuarioPorCedula(this.cedula).subscribe({
      next: (data) => this.usuario = data,
      error: (err) => {
        console.error(err);
        this.usuario = null;
      }
    });
  }
}
