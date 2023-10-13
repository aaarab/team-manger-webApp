import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {TopbarMenuService} from "./topbar-menu.service";
import {Router} from "@angular/router";
import {DialogService} from "primeng/dynamicdialog";
import {SearchComponent} from "../../../search/search.component";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  menuItems!: MenuItem[];

  constructor(
    private topbarMenuService: TopbarMenuService,
    private router: Router,
    private dialogService: DialogService
  ) {
    this.menuItems = topbarMenuService.menuItems;
  }

  ngOnInit(): void {
  }


  openSearchDialog(): void {
    this.dialogService.open(SearchComponent, {
      header: 'Search',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }

  redirectToSearchPage(): void {
    this.router.navigate(['/search']);
  }
}
