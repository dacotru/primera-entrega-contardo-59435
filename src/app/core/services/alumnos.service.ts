import { Injectable } from '@angular/core';
import { Alumno } from '../../features/dashboard/alumnos/models';
import { delay, Observable, of } from 'rxjs';

let ALUMNOSBASE: Alumno[] = [
  {
    id: '63c9',
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

  getUsers(): Observable<Alumno[]> {
    return new Observable((observer) => {
      setInterval(() => {
        observer.next(ALUMNOSBASE);
        observer.complete();
      }, );
    });
  }

  removeUserById(id: string): Observable<Alumno[]> {
    ALUMNOSBASE = ALUMNOSBASE.filter((user) => user.id != id);
    return of(ALUMNOSBASE).pipe(delay(1000));
  }

  updateUserById(id: string, update: Partial<Alumno>) {
    ALUMNOSBASE = ALUMNOSBASE.map((user) =>
      user.id === id ? { ...user, ...update } : user
    );

    return new Observable<Alumno[]>((observer) => {
      observer.next(ALUMNOSBASE);
      observer.complete();
    });
  }
}
