import {Component, Input, OnInit} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {AccountService} from "../../core/auth/account.service";

@Component({
  selector: 'app-acl',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './acl.component.html',
  styleUrls: ['./acl.component.scss']
})
export class AclComponent implements OnInit {

  hasAuthority!: boolean;

  @Input()
  authorities!: { roles?: string[] | string , permissions?: string[] | string };

  constructor(protected accountService: AccountService) { }

  ngOnInit(): void {
    this.hasAuthority = this.accountService.hasAnyAuthority(this.authorities);
  }

}
