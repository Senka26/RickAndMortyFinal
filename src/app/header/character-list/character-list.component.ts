import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  characters$: Observable<any>;

  nameFilter: string = '';

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.characters$ = this.characterService.getCharacters();
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
}
