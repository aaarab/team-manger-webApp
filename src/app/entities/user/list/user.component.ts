import {Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from "@angular/common/http";
import { filter } from "rxjs";
import {ConfirmationService, MessageService} from "primeng/api";
import {IUser} from "../user.model";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {

  users!: IUser[];
  loading: boolean;

  constructor(
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected confirmationService: ConfirmationService,
    protected messageService: MessageService,
  ) {
    this.loading = true;
  }

  trackId = (_index: number, item: IUser): number => this.userService.getUserIdentifier(item);

  ngOnInit(): void {
    this.loadAll();
  }


  loadAll(): void {
    const serverQuery = { with: 'roles,account' };
    this.userService.query(serverQuery)
      .pipe(filter((res) => res.ok))
      .subscribe(res => {
        this.onResponseSuccess(res);
      })
  }

  delete(id: number): void {
    this.confirmationService.confirm({
      header: 'Confirm delete operation',
      message: `Are you sure you want to delete :${id}`,
      accept: () => {
        this.userService.delete(id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: `User is deleted with identifier ${id}`
          });
          this.loadAll();
        });
      },
    });
  }

  protected onResponseSuccess(response: HttpResponse<IUser[]>): void {
    this.loading = false;
    this.users = response.body!;
  }

}
