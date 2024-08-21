import { Component } from '@angular/core';
import { AuthFormComponent } from '@shared/components/auth-form/auth-form.component';
import { FormService } from '@shared/services/form.service';
import { EmailField } from '@auth/models/form/email-field';
import { PasswordField } from '@auth/models/form/password-field';
import { FormField } from '@shared/models/form/form-field';

@Component({
  selector: 'auth-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [AuthFormComponent],
  providers: [FormService],
})
export class LoginComponent {
  fields!: FormField[];

  constructor() {}

  ngOnInit() {
    this.fields = [
      new EmailField({ validations: { required: true, email: true } }),
      new PasswordField({ validations: { required: true } }),
    ];
  }

  getFormValue(value: any) {
    console.log(value);
  }
}
