import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  favouriteCharacters: any[] = [];
  dataSource: MatTableDataSource<any>;

  constructor() { }

  ngOnInit(): void {
    const favouritesFromStorage = localStorage.getItem('favouriteCharacters');
    if (favouritesFromStorage) {
      this.favouriteCharacters = JSON.parse(favouritesFromStorage);
    }
    this.dataSource = new MatTableDataSource(this.favouriteCharacters);
  }

  

}
