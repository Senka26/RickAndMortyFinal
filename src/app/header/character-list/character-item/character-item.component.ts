import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-character-item',
  templateUrl: './character-item.component.html',
  styleUrls: ['./character-item.component.scss']
})
export class CharacterItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() height: number = 0;
  @Input() width: number = 20;
  @Input() color: string = '#808080';

  @Input() character: any;

}
