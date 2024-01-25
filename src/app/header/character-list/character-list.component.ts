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

  // currentPage = 1;
  // totalPages: number;

  pageIndex = 0;
  pageSize = 20;
  // pageSizeOptions: number[] = [10, 20, 30]; // obrisi jer je trazeno da se prikazuje tacno 20 el. po stranici
  paginatedCharacters: any[] = [];

  totalNumOfCharacters = 0;

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private characterService: CharacterService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.characters$ = this.characterService.getCharacters();
    this.characters$.subscribe(data => {
      console.log('Data received:', data);
      this.totalNumOfCharacters = data.info.count;
      this.dataSource = new MatTableDataSource(data.results);
      this.dataSource.paginator = this.paginator;
      console.log('this.paginator', this.paginator);
      this.paginateCharacters();
    });

    // this.characters$ = this.characterService.getCharacters();
    // this.characters$.subscribe(characters => {
    //   this.dataSource = new MatTableDataSource(characters);
    //   this.dataSource.paginator = this.paginator;
    //   this.paginateCharacters();
    // });

    // this.loadCharacters(); //ovo ne

    //ok bez paginacije:
    // this.characters$ = this.characterService.getCharacters();
  }

  numberOfRectangles = 27;

  rectangles = Array.from({ length: this.numberOfRectangles }, () => ({ height: 120, width: 100, color: '#808080' }));

  itemsPerRow = 6;

  get rows(): any[] {
    // Razdvajam pravougaonike u grupe prema broju u svakom redu
    return this.chunkArray(this.rectangles, this.itemsPerRow);
  }

  // Pomoćna funkcija za razdvajanje niza na manje grupe
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

  pageChanged(event: any): void {
    this.pageIndex = event.pageIndex + 1; // +1 jer API stranice kreću od 1
    this.characterService.getCharacters(this.pageIndex).subscribe(data => {
      this.totalNumOfCharacters = data.info.count;
      this.dataSource = new MatTableDataSource(data.results);
      this.dataSource.paginator = this.paginator;
      this.paginateCharacters();
    });
  }
  

  // pageChanged(event: any): void {
  //   this.pageIndex = event.pageIndex;
  //   this.paginateCharacters();
  // }

  private paginateCharacters(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCharacters = this.dataSource.data.slice(startIndex, endIndex);
  }

  //ovo ne:
  // loadCharacters(): void {
  //   this.characterService.getCharacters(this.currentPage)
  //     .subscribe(data => {
  //       this.characters$ = data.results;
  //       this.totalPages = data.info.pages;
  //     });
  // }

  // onPageChange(page: number): void {
  //   if (page >= 1 && page <= this.totalPages) {
  //     this.currentPage = page;
  //     this.loadCharacters();
  //   }
  // }
}
