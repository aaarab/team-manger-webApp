import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {TopbarMenuService} from "./topbar-menu.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  menuItems!: MenuItem[];

  constructor(private topbarMenuService: TopbarMenuService) {
    this.menuItems = topbarMenuService.menuItems;
  }

  ngOnInit(): void {
  }

}
