import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlumnosDialogComponent } from './alumnos-dialog/alumnos-dialog.component';
import { Alumnos } from './models';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss',
})
export class AlumnosComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'createdAt', 'actions' ];
  dataSource: Alumnos[] = [];

  isLoading = false;

  usuario = {
    nombre: 'Daniella',
    apellido: 'Contardo',
  };

  constructor(
    private matDialog: MatDialog,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.dataSource = users;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onDelete(id: string) {
    if (confirm('¿Estás seguro que quieres eliminar este alumno?')) {
      // this.dataSource = this.dataSource.filter((user) => user.id !== id);
      this.isLoading = true;
      this.usersService.removeUserById(id).subscribe({
        next: (users) => {
          this.dataSource = users;
        },
        error: (err) => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  openModal(editingUser?: Alumnos): void {
    this.matDialog
      .open(AlumnosDialogComponent, {
        data: {
          editingUser,
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            if (editingUser) {
              this.handleUpdate(editingUser.id, result);
            } else {
              this.dataSource = [...this.dataSource, result];
            }
          }
        },
      });
  }


  handleUpdate(id: string, update: Alumnos): void {
    this.isLoading = true;
    this.usersService.updateUserById(id, update).subscribe({
      next: (users) => {
        this.dataSource = users;
      },
      error: (err) => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
