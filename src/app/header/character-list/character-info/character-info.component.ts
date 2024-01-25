import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-character-info',
  templateUrl: './character-info.component.html',
  styleUrls: ['./character-info.component.scss'],
})
export class CharacterInfoComponent implements OnInit {

  @Input() character: any; //mozda obr
  @Output() closeModalEvent = new EventEmitter<void>(); //mozda obr

  constructor(
    public dialogRef: MatDialogRef<CharacterInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log("this.data:");
    console.log(this.data);
  }

  closeModal() {
    this.dialogRef.close();
  }

}
