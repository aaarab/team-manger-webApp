import {Component, Input, OnInit, Optional} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {EventLogService, IEventLog} from "./event-log.service";
import {filter} from "rxjs";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {IncludesPipe} from "../../shared/pipes/array/includes.pipe";

@Component({
  selector: 'app-event-logs',
  standalone: true,
  imports: [SharedModule, ProgressSpinnerModule, IncludesPipe],
  templateUrl: './event-logs.component.html',
  styleUrls: ['./event-logs.component.scss']
})
export class EventLogsComponent implements OnInit {

  loading: boolean;
  eventLogs!: IEventLog[];

  constructor(
    protected eventLogService: EventLogService,
    protected dynamicDialogRef: DynamicDialogRef,
    protected dynamicDialogConfig: DynamicDialogConfig,
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.loadAll();
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
}
