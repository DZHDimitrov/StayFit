import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reading-block',
  templateUrl: './reading-preview.component.html',
  styleUrls: ['./reading-preview.component.scss'],
})
export class ReadingBlockComponent implements OnInit {
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() width: number = 250;
  @Input() height: number = 215;

  constructor() {}

  ngOnInit(): void {}
}
