import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  constructor(private router: Router) {}

  searchText!: string;

  search(ev: any): void {
    this.searchText = ev.value;
  }

  navigate() {
    this.router.navigate(['/', 'pages', 'foods'], {
      queryParams: { search: this.searchText },
    });
  }
}
