import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormField, EmailField, PasswordField } from 'models/form';
import { AuthService, FormService } from 'services';
import { LoginFormType } from 'models/auth.types';
import { FormFieldComponent } from 'components/form-field/form-field.component';
import { Button, ButtonComponent } from 'components/button';
import { markAsTouchedFields } from 'helpers';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';

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
