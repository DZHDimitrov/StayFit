import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-knowledge-navigation',
  templateUrl: './knowledge-navigation.component.html',
  styleUrls: ['./knowledge-navigation.component.scss']
})
export class KnowledgeNavigationComponent implements OnInit {

  @Input() heading: string = "Знание";

  constructor() { }

  ngOnInit(): void {
  }

}
