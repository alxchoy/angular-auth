import { Component } from '@angular/core';
import { FormComponent } from '@shared/components/form/form.component';
import { EmailField } from '@shared/models/form/email-field';
import { PasswordField } from '@shared/models/form/password-field';
import { FormField } from '@shared/models/form/form-field';
import { AuthService } from '@shared/services/auth.service';
import { LoginFormGroup, LoginFormValue } from '@auth/models';
import { FormGroup } from '@angular/forms';
import { FormService } from '@shared/services/form.service';

@Component({
  selector: 'auth-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [FormComponent],
  providers: [AuthService, FormService],
})
export class LoginComponent {
  fields!: FormField[];
  loginForm!: FormGroup<LoginFormGroup>;

  constructor(
    private authService: AuthService,
    private formService: FormService
  ) {}

  ngOnInit() {
    this.fields = [
      new EmailField({ validations: { required: true, email: true } }),
      new PasswordField({ validations: { required: true } }),
    ];
    this.loginForm = this.formService.createFormGroup(this.fields);
  }

  onSubmitForm(value: LoginFormValue) {
    console.log('login form');
    this.authService.login(value);
  }
}
