import { Injectable } from '@angular/core';
import { Alumnos } from '../../features/dashboard/alumnos/models';
import { delay, Observable, of } from 'rxjs';

let DATABASE: Alumnos[] = [
  {
    id: '1',
    firstName: 'Daniella',
    lastName: 'Contardo',
    createdAt: new Date(),
    email: 'danicontardo@gmail.com',
  },
];

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  getUsers(): Observable<Alumnos[]> {
    return new Observable((observer) => {
      setInterval(() => {
        observer.next(DATABASE);
        observer.complete();
      }, );
    });
  }

  removeUserById(id: string): Observable<Alumnos[]> {
    DATABASE = DATABASE.filter((user) => user.id != id);
    return of(DATABASE).pipe(delay(1000));
  }

  updateUserById(id: string, update: Partial<Alumnos>) {
    DATABASE = DATABASE.map((user) =>
      user.id === id ? { ...user, ...update } : user
    );

    return new Observable<Alumnos[]>((observer) => {
      setInterval(() => {
        observer.next(DATABASE);
        observer.complete();
      }, 1000);
    });
  }
}
