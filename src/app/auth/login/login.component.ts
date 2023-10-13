import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse } from "@angular/common/http";
import {MessageService} from "primeng/api";
import {finalize, Observable} from "rxjs";
import { SharedModule } from "../../shared/shared.module";
import {LoginService} from "./login.service";
import {Login} from "./login.model";
import {MessageModule} from "primeng/message";
import {InputSwitchModule} from "primeng/inputswitch";
import {AccountService} from "../../core/auth/account.service";
import {Account} from "../../core/auth/account.model";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule, RouterLink, MessageModule, InputSwitchModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, AfterViewInit {
  isSaving: boolean;

  loginForm = this.createLoginForm();

  @ViewChild('email', { static: true })
  email?: ElementRef;

  constructor(
    private accountService: AccountService,
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
  ) {
    this.isSaving = false;
  }

  ngOnInit(): void {
    // if already authenticated then navigate to home page.
    this.accountService.identity().subscribe(() => {
      if (this.accountService.isAuthenticated()) {
       this.router.navigate(['']);
      }
    });
  }

  ngAfterViewInit(): void {
    this.email?.nativeElement.focus();
  }

  login(): void {
    if (this.loginForm.valid) {
      this.isSaving = true;
      const credentials = this.loginForm.value;
      this.subscribeToSaveResponse(this.loginService.login(credentials as Login));
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  protected subscribeToSaveResponse(response: Observable<Account | null>): void {
    response.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSuccess(),
      error: (error: HttpErrorResponse) => {
        this.onError(error.message);
      }
    })
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected onSuccess(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'login success!'
    })
    if (!this.router.getCurrentNavigation()) {
      this.router.navigate(['']);
    }
  }

  protected onError(summary: string): void {
    this.messageService.add({
      severity: 'error',
      summary
    });
  }

  private createLoginForm(): FormGroup {
     return  this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        rememberMe: [true],
      });
  }
}
