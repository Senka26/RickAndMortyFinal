import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PracticeProject';

  // check if needed
  open(event: any) {
    // My 'open' method logic here
    console.log('Menu clicked:', event);
  }
}
