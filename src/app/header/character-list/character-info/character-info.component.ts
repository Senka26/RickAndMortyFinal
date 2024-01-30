import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-character-info',
  templateUrl: './character-info.component.html',
  styleUrls: ['./character-info.component.scss'],
})
export class CharacterInfoComponent implements OnInit {

  favouriteCharacters: any[] = [];
  dataSource: MatTableDataSource<any>;

  constructor(
    public dialogRef: MatDialogRef<CharacterInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.loadFavouriteCharacters();
  }

  addToFavourites() {
    const favouritesFromStorage = localStorage.getItem('favouriteCharacters');
  
    if (favouritesFromStorage) {
      this.favouriteCharacters = JSON.parse(favouritesFromStorage);
      const isCharacterInFavourites = this.favouriteCharacters.some(
        (favChar) => favChar.id === this.data.id
      );
  
      if (!isCharacterInFavourites) {
        this.favouriteCharacters.push(this.data);
        localStorage.setItem('favouriteCharacters', JSON.stringify(this.favouriteCharacters));
        this.dataSource = new MatTableDataSource(this.favouriteCharacters);
      }
    } else {
      this.favouriteCharacters = [this.data];
      localStorage.setItem('favouriteCharacters', JSON.stringify(this.favouriteCharacters));
      this.dataSource = new MatTableDataSource(this.favouriteCharacters);
    }

    alert("You added the character to Favourites List successfully!");
    this.closeModal();
  }

  private loadFavouriteCharacters() {
    const favouritesFromStorage = localStorage.getItem('favouriteCharacters');
    this.favouriteCharacters = favouritesFromStorage ? JSON.parse(favouritesFromStorage) : [];
  }

  removeFromFavourites() {
    this.favouriteCharacters = this.favouriteCharacters.filter(char => char.id !== this.data.id);
    localStorage.setItem('favouriteCharacters', JSON.stringify(this.favouriteCharacters));

    alert("You removed the character from Favourites List successfully!");
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }

}
