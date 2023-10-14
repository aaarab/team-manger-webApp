import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IAccount} from "../account.model";

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit{

  isSaving: boolean;
  account!: IAccount;

  constructor(
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
  ) {
    this.isSaving = false
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ account }) => {
      this.account = account;
    });
  }

  previousState(): void {
    window.history.back();
  }

}
