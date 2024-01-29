import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private apiUrl = 'https://rickandmortyapi.com/api/character';
  // private apiUrl = 'https://rickandmortyapi.com/api/character/?page=18';

  constructor(private http: HttpClient) { }

  getCharacters(page?: number): Observable<any> {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get(url)
      .pipe(
        catchError(error => {
          console.error('Error fetching characters:', error);
          return throwError(() => new Error('Ovo je greška'));
        })
      );
  }
  
  searchCharacters(page?: number, name?: string): Observable<any> {
    const url = `${this.apiUrl}?page=${page}&name=${name}`;
    return this.http.get(url)
      .pipe(
        catchError(error => {
          console.error('Error fetching characters:', error);
          return throwError(() => new Error('Ovo je greška'));
        })
      );
  }

}
