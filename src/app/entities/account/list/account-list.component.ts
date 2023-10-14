import {Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {AccountService} from "../service/account.service";
import {IAccount} from "../account.model";
import {filter} from "rxjs";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit  {

  loading: boolean;
  accounts!: IAccount[];

  constructor(
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected messageService: MessageService,
    protected confirmationService: ConfirmationService,
  ) {
    this.loading = true;
  }

  trackId = (_index: number, item: IAccount): number => this.accountService.getAccountIdentifier(item);

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    const serverQuery = { withCount: 'employers' };
    this.accountService.query(serverQuery)
      .pipe(filter(res => res.ok))
      .subscribe(res => {
        this.onResponseSuccess(res);
      });
  }

  delete(id: number): void {
    this.confirmationService.confirm({
      header: 'Confirm delete operation',
      message: `Are you sure you want to delete :${id}`,
      accept: () => {
        this.accountService.delete(id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: `Account is deleted with identifier ${id}`
          });
          this.loadAll();
        });
      },
    });
  }

  protected onResponseSuccess(res: HttpResponse<IAccount[]>): void {
    this.accounts = res.body!
    this.loading = false;
  }

}
