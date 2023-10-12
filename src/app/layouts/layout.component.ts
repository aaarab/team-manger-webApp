import { Component, OnInit } from '@angular/core';
import {Layout, LayoutService} from "./layout.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  layout!: Layout;

  constructor(private layoutService: LayoutService) {
    this.layoutService.layout$.subscribe(layout => {
      this.layout = layout;
    });
  }

  ngOnInit(): void {
  }

}
