import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService, FormService } from '@core/services';
import { AuthFormComponent } from '@features/auth/components/auth-form/auth-form.component';
import { RegisterFormType } from '@features/auth/models/auth.types';
import {
  FormField,
  EmailField,
  PasswordField,
  TextField,
} from '@shared/models/form';
import {
  Button,
  ButtonComponent,
} from '@shared/components/button/button.component';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { markAsTouchedFields } from '@shared/helpers/form-helper';

@Component({
  selector: 'ch-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [
    FormFieldComponent,
    ReactiveFormsModule,
    ButtonComponent,
    AuthFormComponent,
  ],
  providers: [AuthService, FormService],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup<RegisterFormType>;
  fields!: FormField[];
  buttons!: Button[];
  formTitle: string;

  constructor(
    private authService: AuthService,
    private formService: FormService,
  ) {
    this.formTitle = 'Register';
    this.setFormFields();
    this.setFormButtons();
  }

  ngOnInit() {
    this.registerForm = this.formService.createFormGroup(this.fields);
  }

  onSubmitForm() {
    if (this.registerForm.invalid) {
      markAsTouchedFields(this.registerForm);
      return;
    }

    const { email, password, fullName } = this.registerForm.value;
    this.authService
      .register({ email: email!, password: password!, fullName: fullName! })
      .subscribe();
  }

  private setFormFields() {
    const nameField = new TextField({
      name: 'fullName',
      label: 'Full name',
      validations: { required: true },
    });
    const emailField = new EmailField({
      validations: { required: true, email: true },
    });
    const passwordField = new PasswordField({
      validations: { required: true, minLength: 6 },
    });
    const passwordConfirmField = new PasswordField({
      name: 'passwordConfirm',
      label: 'Password confirm',
      validations: {
        required: true,
        matchTo: passwordField.control,
        minLength: 6,
      },
    });

    this.fields = [nameField, emailField, passwordField, passwordConfirmField];
  }

  private setFormButtons() {
    this.buttons = [
      { label: 'Register', onAction: this.onSubmitForm.bind(this) },
      { label: 'Login', type: 'link', goTo: '/login', class: 'outline' },
    ];
  }
}
