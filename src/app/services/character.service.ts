import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private apiUrl = 'https://rickandmortyapi.com/api/character';
  // private apiUrl = 'https://rickandmortyapi.com/api/character/?page=18';

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<any> {
    // return this.http.get(this.apiUrl);
    return this.http.get(this.apiUrl)
    .pipe(
      tap(data => console.log('Characters data:', data)),
      catchError(error => {
        console.error('Error fetching characters:', error);
        return throwError(() => new Error('Ovo je greška'));
      })
    );
  }
}
