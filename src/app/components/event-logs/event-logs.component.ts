import {Component, Input, OnInit, Optional} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {EventLogService, IEventLog} from "./event-log.service";
import {filter} from "rxjs";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {DynamicDialogConfig } from "primeng/dynamicdialog";
import {IncludesPipe} from "../../shared/pipes/array/includes.pipe";
import {ArrayObjectHasKeyValuePipe} from "../../shared/pipes/array/array-object-has-key-value.pipe";
import {AccountService} from "../../entities/account/service/account.service";
import {IAccount} from "../../entities/account/account.model";
import {FindByKeyPipe} from "../../shared/pipes/array/find-by-key.pipe";

@Component({
  selector: 'app-event-logs',
  standalone: true,
  imports: [SharedModule, ProgressSpinnerModule, IncludesPipe, ArrayObjectHasKeyValuePipe, FindByKeyPipe],
  templateUrl: './event-logs.component.html',
  styleUrls: ['./event-logs.component.scss']
})
export class EventLogsComponent implements OnInit {

  loading: boolean;
  eventLogs!: IEventLog[];
  accounts!: IAccount[];

  constructor(
    protected eventLogService: EventLogService,
    protected dynamicDialogConfig: DynamicDialogConfig,
    protected accountService: AccountService,
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.loadAll();
    this.loadAllAccounts();
  }

  loadAll(): void {
    const serverQuery = {
      object_type: this.dynamicDialogConfig.data.objectType,
      object_id: this.dynamicDialogConfig.data.objectId,
    };
    this.eventLogService.query(serverQuery)
      .pipe(filter(res => res.ok))
      .subscribe(res => {
         this.eventLogs = res.body!.filter(el => el.original.length === 0 || el.changes.hasOwnProperty('status'));
         this.loading = false;
      });
  }

  loadAllAccounts(): void {
    this.accountService.query().subscribe(res => this.accounts = res.body!);
  }
}
