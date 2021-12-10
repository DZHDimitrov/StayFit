import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reading-block',
  templateUrl: './reading-block.component.html',
  styleUrls: ['./reading-block.component.scss'],
})
export class ReadingBlockComponent implements OnInit {
  @Input() imageUrl: string = '';
  @Input() title: string = '';

  constructor() {}

  ngOnInit(): void {}
}
