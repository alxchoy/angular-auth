import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService, FormService } from '@core/services';
import { LoginFormType } from '@features/auth/models/auth.types';
import { AuthFormComponent } from '@features/auth/components/auth-form/auth-form.component';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import {
  Button,
  ButtonComponent,
} from '@shared/components/button/button.component';
import { markAsTouchedFields } from '@shared/helpers/form-helper';
import { FormField, EmailField, PasswordField } from '@shared/models/form';

@Component({
  selector: 'auth-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    FormFieldComponent,
    ReactiveFormsModule,
    ButtonComponent,
    AuthFormComponent,
  ],
  providers: [AuthService, FormService],
})
export class LoginComponent {
  loginForm!: FormGroup<LoginFormType>;
  fields!: FormField[];
  buttons!: Button[];
  loginBtn!: Button;
  registerBtn!: Button;
  formTitle: string;

  constructor(
    private authService: AuthService,
    private formService: FormService,
  ) {
    this.formTitle = 'Welcome back!';
    this.setFormFields();
    this.setFormButtons();
  }

  ngOnInit() {
    this.loginForm = this.formService.createFormGroup(this.fields);
  }

  onSubmitForm() {
    if (this.loginForm.invalid) {
      markAsTouchedFields(this.loginForm);
      return;
    }
    const { email, password } = this.loginForm.value;
    this.authService.login({ email: email!, password: password! }).subscribe();
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

  private setFormButtons() {
    this.buttons = [
      { label: 'Login', onAction: this.onSubmitForm.bind(this) },
      { label: 'Register', type: 'link', goTo: '/register', class: 'outline' },
    ];
  }
}
