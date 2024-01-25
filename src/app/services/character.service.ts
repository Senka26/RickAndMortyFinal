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

  // getCharacters(): Observable<any> {
  //   return this.http.get(this.apiUrl).pipe(
  //     map(response => response['results']), // Extract 'results' array from the response
  //     tap(data => console.log('Characters data:', data)),
  //     catchError(error => {
  //       console.error('Error fetching characters:', error);
  //       return throwError(() => new Error('Ovo je greška'));
  //     })
  //   );
  // }

  // II nacin:
  getCharacters(page?: number): Observable<any> { //ja dodala ? da bi i dalje radio prikaz karaktera na listi
    if(!page) page = 1; //vidi da li ti treba
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

//ok bez paginacije
  // getCharacters(): Observable<any> {
  //   // return this.http.get(this.apiUrl)
  //   return this.http.get(this.apiUrl)
  //   .pipe(
  //     tap(data => console.log('Characters data:', data)),
  //     catchError(error => {
  //       console.error('Error fetching characters:', error);
  //       return throwError(() => new Error('Ovo je greška'));
  //     })
  //   );
  // }
}
