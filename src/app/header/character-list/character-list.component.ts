import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CharacterService } from 'src/app/services/character.service';
import { CharacterInfoComponent } from './character-info/character-info.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  characters: Observable<any>;
  selectedCharacter: any;

  nameFilter: string = '';
  statusFilter: string = '';
  speciesFilter: string = '';
  genderFilter: string = '';
  searchFilter: string = '';

  pageIndex = 0;
  pageSize = 20;
  paginatedCharacters: any[] = [];

  totalNumOfCharacters = 0;

  dataSource: MatTableDataSource<any>;

  constructor(
    private characterService: CharacterService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.characters = this.characterService.getCharacters(this.pageIndex + 1);
    this.updateList();
  }

  openModal(character: any) {
    this.selectedCharacter = character;
    this.dialog.open(CharacterInfoComponent, {
      minWidth: '300px',
      data: character
    });
  }

  closeModal() {
    this.selectedCharacter = null;
  }

  handlePageEvent(e: any) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    if (this.nameFilter !== '' || this.statusFilter !== '' || this.speciesFilter !== '' || this.genderFilter !== '') {
      this.updateList();
      return;
    }

    this.characters = this.characterService.getCharacters(this.pageIndex + 1);
    this.updateList();
  }
  
  searchCharacters() {
    this.paginatedCharacters = this.dataSource.data;
    this.paginatedCharacters = this.paginatedCharacters.filter(x => 
      x.name.toLowerCase().includes(this.searchFilter.toLowerCase()) ||
      x.gender.toLowerCase() === this.searchFilter.toLowerCase() ||
      x.species.toLowerCase().includes(this.searchFilter.toLowerCase()) ||
      x.location.name.toLowerCase().includes(this.searchFilter.toLowerCase())
    );
  }
  
  updateList() {
    this.characters = this.characterService.getCharacters(
      this.pageIndex + 1,
      this.nameFilter,
      this.statusFilter,
      this.speciesFilter,
      this.genderFilter
    );

    this.characters.subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });
  }
  
  private handleResponse(data) {
    this.totalNumOfCharacters = data.info.count;
    if (!this.dataSource)
        this.dataSource = new MatTableDataSource(data.results);
    this.dataSource.data = data.results;
    this.paginatedCharacters = data.results;
  }
  
  private handleError() {
    this.dataSource.data = null;
    this.paginatedCharacters = null;
  }
}