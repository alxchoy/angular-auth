import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormField, EmailField, PasswordField } from '@core/models/form';
import { AuthService, FormService } from '@core/services';
import { LoginFormGroup } from '@auth/models';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { Button, ButtonComponent } from '@shared/components/button';
import { markAsDirtyFields } from '@shared/helpers';

@Component({
  selector: 'auth-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [FormFieldComponent, ReactiveFormsModule, ButtonComponent],
  providers: [AuthService, FormService],
})
export class LoginComponent {
  loginForm!: FormGroup<LoginFormGroup>;
  fields!: FormField[];
  loginBtn!: Button;

  constructor(
    private authService: AuthService,
    private formService: FormService
  ) {
    this.loginBtn = {
      label: 'Login',
      onAction: this.onSubmitForm.bind(this),
    };
    this.setFormFields();
  }

  ngOnInit() {
    this.loginForm = this.formService.createFormGroup(this.fields);
  }

  private setFormFields() {
    const emailField = new EmailField({
      validations: { required: true, email: true },
    });
    const passwordField = new PasswordField({
      validations: { required: true },
    });
    this.fields = [emailField, passwordField];
  }

  onSubmitForm() {
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      markAsDirtyFields(this.loginForm);
      return;
    }
    console.log(this.loginForm.value);
    // this.authService.register(value);
  }
}
