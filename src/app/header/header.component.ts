import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showToggle = false;
  showFavouritesAndLogout = false;
  showSidenav = false;
  @ViewChild('drawer') drawer: MatSidenav | undefined;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 600px)'])
      .subscribe((result) => {
        this.showToggle = result.matches;
        this.showFavouritesAndLogout = !result.matches;
        this.showSidenav = result.matches;
      });
  }

  logout() {
    this.router.navigate(['/login']);
  }

  navigateToFavourites() {
    this.router.navigate(['/favourites']);
  }

  toggleSidenav() {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }
}
