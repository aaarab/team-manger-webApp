import { Component, OnInit } from '@angular/core';
import { take } from "rxjs";
import { Account } from "../../../core/auth/account.model";
import { AccountService } from "../../../core/auth/account.service";
import {IUser} from "../user.model";
import {DatePipe} from "@angular/common";
import {DATE_FORMAT} from "../../../core/constants/input.contants";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  account!: Account;
  user!: IUser;

  constructor(
    private accountService: AccountService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.accountService.getAuthenticationState()
      .pipe(take(1))
      .subscribe(account => {
        this.account = account!;
        this.user = this.convertUserDate(account as unknown as IUser);
      });
  }

  private convertUserDate<T extends IUser>(user: T): T {
    return {
      ...user,
      birthday:  user.birthday ? new Date(user.birthday) : null,
    }
  }
}
