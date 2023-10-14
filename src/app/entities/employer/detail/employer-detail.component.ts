import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployer } from '../employer.model';

@Component({
  selector: 'app-employer-detail',
  templateUrl: './employer-detail.component.html',
})
export class EmployerDetailComponent implements OnInit {
  employer!: IEmployer;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employer }) => {
      this.employer = employer;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
