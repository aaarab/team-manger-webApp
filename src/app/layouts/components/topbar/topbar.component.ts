import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";
import {TopbarMenuService} from "./topbar-menu.service";
import {Router} from "@angular/router";
import {DialogService} from "primeng/dynamicdialog";
import {SearchComponent} from "../../../search/search.component";
import {LoginService} from "../../../auth/login/login.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

  menuItems!: MenuItem[];

  constructor(
    private topbarMenuService: TopbarMenuService,
    private router: Router,
    private dialogService: DialogService,
    private loginService: LoginService,
  ) {
    topbarMenuService.menuItems$.subscribe(menuItems => {
      this.menuItems = menuItems;
    });
  }

  openSearchDialog(): void {
    this.dialogService.open(SearchComponent, {
      header: 'Search',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/auth/login']);
  }
}
