import {AfterViewInit, Component, ElementRef, OnInit, Optional, ViewChild} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {RouterLink, RouterLinkWithHref} from "@angular/router";
import {ISearchResult, SearchService} from "./search.service";
import {filter} from "rxjs";
import {  DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SharedModule, RouterLink, RouterLinkWithHref],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit {

  searchResult?: ISearchResult;

  @ViewChild('query', { static: true })
  query?: ElementRef;

  constructor(
    protected searchService: SearchService,
    @Optional() protected dynamicDialogRef: DynamicDialogRef | null,
  ) { }

  ngAfterViewInit(): void {
    this.query?.nativeElement.focus();
  }

  onSearchQueryChanged(value: string): void {
    this.searchService.query({ value })
      .pipe(filter((res) => res.ok))
      .subscribe(res => {
        this.searchResult = res.body!;
      });
  }

  close(): void {
    if (this.dynamicDialogRef) {
      this.dynamicDialogRef.close();
    }
  }
}
