import { Component } from '@angular/core';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Администрация');
  }
}
