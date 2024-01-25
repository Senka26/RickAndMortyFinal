import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CharacterService } from 'src/app/services/character.service';
import { CharacterInfoComponent } from './character-info/character-info.component';

import { MatPaginator } from '@angular/material/paginator';
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
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator; //msm da mi ipak ne treba

  constructor(private characterService: CharacterService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.characters$ = this.characterService.getCharacters(1);
    this.characters$.subscribe(data => {
      // console.log('Data received:', data);
      this.totalNumOfCharacters = data.info.count;
      this.dataSource = new MatTableDataSource(data.results);
      // this.dataSource.paginator = this.paginator; //msm da mi ipak ne treba
      // console.log('this.paginator', this.paginator);
      this.paginateCharacters();
    });

  }

  numberOfRectangles = 27;
  rectangles = Array.from({ length: this.numberOfRectangles }, () => ({ height: 120, width: 100, color: '#808080' }));
  itemsPerRow = 6;

  get rows(): any[] {
    return this.chunkArray(this.rectangles, this.itemsPerRow);
  }

  private chunkArray(array: any[], chunkSize: number): any[] {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  get itemWidth(): string {
    return `calc(100% / ${this.itemsPerRow} - 20px)`;
  }

  get itemMargin(): string {
    return '0 10px';
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
    // if(e.pageIndex === 1)
    //   e.pageIndex = 2;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    // this.characters$ = this.characterService.getCharacters(this.pageIndex);//2
    this.characters$ = this.characterService.getCharacters(this.pageIndex + 1);
    this.characters$.subscribe(data => { //console.log: data, paginatedCharacters
      console.log('data: '+ data);
      
      // this.paginatedCharacters = data;
      this.paginatedCharacters = data.results; //msm da je ipak nepotrebno ovde to setovati kad ispod svakako pozivam paginateCharactters
      // this.dataSource.filteredData = data.results;// ja
      this.dataSource = new MatTableDataSource(data.results); //ja
      // this.paginateCharacters();
    });

    // this.characterService.getCharacters(2);
    // this.characterService.getCharacters(this.pageIndex);
  }

  // pageChanged(event: any): void {
  //   this.pageIndex = event.pageIndex + 1; // +1 jer API stranice kreću od 1
  //   this.characterService.getCharacters(this.pageIndex).subscribe(data => {
  //     this.totalNumOfCharacters = data.info.count;
  //     this.dataSource = new MatTableDataSource(data.results);
  //     this.dataSource.paginator = this.paginator;
  //     this.paginateCharacters();
  //   });
  // }
  
  // pageChanged(event: any): void {
  //   this.pageIndex = event.pageIndex;
  //   this.paginateCharacters();
  // }

  private paginateCharacters(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCharacters = this.dataSource.data.slice(startIndex, endIndex); //console.log: startIndex, endIndex, this.paginatedCharacters
    
  }

}