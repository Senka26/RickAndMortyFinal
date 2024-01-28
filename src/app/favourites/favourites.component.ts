import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditCharacterComponent } from './edit-character/edit-character.component';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  favouriteCharacters: any[] = [];
  dataSource: MatTableDataSource<any>;

  constructor(
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    const favouritesFromStorage = localStorage.getItem('favouriteCharacters');
    if (favouritesFromStorage) {
      this.favouriteCharacters = JSON.parse(favouritesFromStorage);
    }
    this.dataSource = new MatTableDataSource(this.favouriteCharacters);
  }

  navigateToHeader() {
    this.router.navigate(['/header']);
  }

  openEditModal(character: any): void {
    const dialogRef = this.dialog.open(EditCharacterComponent, {
      data: { character },
    });

    dialogRef.afterClosed().subscribe((editedCharacter: any) => {
      if (editedCharacter) {
        const index = this.favouriteCharacters.findIndex((char) => char.id === editedCharacter.id);
  
        if (index !== -1) { //if(index)?
          this.favouriteCharacters[index] = { ...editedCharacter };
          localStorage.setItem('favouriteCharacters', JSON.stringify(this.favouriteCharacters));
        }
      }
    });
  }

}
