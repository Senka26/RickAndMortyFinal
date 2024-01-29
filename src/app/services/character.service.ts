import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }
  
  getCharacters(page?: number, name?: string, status?: string, species?: string, gender?: string): Observable<any> {
    let url = `${this.apiUrl}?page=${page}`;
  
    if (name) {
      url += `&name=${name}`;
    }
  
    if (status) {
      url += `&status=${status}`;
    }
  
    if (species) {
      url += `&species=${species}`;
    }
  
    if (gender) {
      url += `&gender=${gender}`;
    }
  
    return this.http.get(url)
      .pipe(
        catchError(error => {
          console.error('Error fetching characters:', error);
          return throwError(() => new Error('Ovo je greška'));
        })
      );
  }

}
