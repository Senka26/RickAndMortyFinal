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

  characters$: Observable<any>;
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

  constructor(private characterService: CharacterService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.characters$ = this.characterService.getCharacters(1);
    this.characters$.subscribe(data => {
      this.totalNumOfCharacters = data.info.count;
      this.dataSource = new MatTableDataSource(data.results);
      this.paginateCharacters();
    });
  }

  openModal(character: any) {
    this.selectedCharacter = character;
    this.dialog.open(CharacterInfoComponent, {
      width: '350px',
      data: character
    });
  }

  closeModal() {
    this.selectedCharacter = null;
  }

  handlePageEvent(e: any) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.characters$ = this.characterService.getCharacters(this.pageIndex + 1);
    this.characters$.subscribe(data => {
      this.paginatedCharacters = data.results;
    });
  }

  private paginateCharacters(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCharacters = this.dataSource.data.slice(startIndex, endIndex);
  }

}