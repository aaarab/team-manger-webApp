import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
})
export class ErrorComponent implements OnInit {

  errorMessage!: string;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((routeData: Data) => {
      if (routeData.errorMessage) {
        this.errorMessage = routeData.errorMessage;
      }
    })
  }
}
