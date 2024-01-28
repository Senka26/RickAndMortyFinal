import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-character',
  templateUrl: './edit-character.component.html',
  styleUrls: ['./edit-character.component.scss']
})
export class EditCharacterComponent implements OnInit {

  editedCharacter: any;

  constructor(
    public dialogRef: MatDialogRef<EditCharacterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.editedCharacter = { ...this.data.character };
  }

  saveChanges(): void {
    const favouritesFromStorage = localStorage.getItem('favouriteCharacters');

    if (favouritesFromStorage) {
      let favouriteCharacters = JSON.parse(favouritesFromStorage);

      const index = favouriteCharacters.findIndex((char) => char.id === this.editedCharacter.id);

      if (index !== -1) { //if(index)
        favouriteCharacters[index].name = this.editedCharacter.name;
        favouriteCharacters[index].status = this.editedCharacter.status;
        favouriteCharacters[index].species = this.editedCharacter.species;
        favouriteCharacters[index].gender = this.editedCharacter.gender;

        localStorage.setItem('favouriteCharacters', JSON.stringify(favouriteCharacters));
      }
    }

    this.dialogRef.close(this.editedCharacter);
  }

}