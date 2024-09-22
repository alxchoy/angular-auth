import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormField, EmailField, PasswordField } from 'models/form';
import { AuthService, FormService } from 'services';
import { LoginFormType } from 'models/auth.types';
import { FormFieldComponent } from 'components/form-field/form-field.component';
import { Button, ButtonComponent } from 'components/button';
import { markAsTouchedFields } from 'helpers';

@Component({
  selector: 'auth-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [FormFieldComponent, ReactiveFormsModule, ButtonComponent],
  providers: [AuthService, FormService],
})
export class LoginComponent {
  loginForm!: FormGroup<LoginFormType>;
  fields!: FormField[];
  loginBtn!: Button;
  registerBtn!: Button;

  constructor(
    private authService: AuthService,
    private formService: FormService,
  ) {
    this.setFormFields();
    this.setFormButtons();
  }

  ngOnInit() {
    this.loginForm = this.formService.createFormGroup(this.fields);
  }

  onSubmitForm() {
    console.log(this.loginForm);
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
    this.loginBtn = {
      label: 'Login',
      onAction: this.onSubmitForm.bind(this),
    };

    this.registerBtn = {
      label: 'Register',
      type: 'link',
      goTo: '/register',
      class: 'outline',
    };
  }
}
