import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private apiUrl = 'https://rickandmortyapi.com/api/character';
  // private apiUrl = 'https://rickandmortyapi.com/api/character/?page=18';

  constructor(private http: HttpClient) { }

  getCharacters(page?: number): Observable<any> { //ja dodala ? da bi i dalje radio prikaz karaktera na listi
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get(url)
      .pipe(
        tap(data => console.log(`Characters data for page ${page}:`, data)),
        catchError(error => {
          console.error('Error fetching characters:', error);
          return throwError(() => new Error('Ovo je greška'));
        })
      );
  }

}
