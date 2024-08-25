import { Component } from '@angular/core';
import { FormField } from '@shared/models/form/form-field';
import { EmailField } from '@shared/models/form/email-field';
import { PasswordField } from '@shared/models/form/password-field';
import { AuthService } from '@shared/services/auth.service';
import { FormComponent } from '@shared/components/form/form.component';
import { FormService } from '@shared/services/form.service';
import { FormGroup } from '@angular/forms';
import { RegisterFormGroup, RegisterFormValue } from '@auth/models';
import { matchTo } from '@shared/helpers/form-validations';

@Component({
  selector: 'ch-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [FormComponent],
  providers: [AuthService, FormService],
})
export class RegisterComponent {
  registerForm!: FormGroup<RegisterFormGroup>;
  fields!: FormField[];

  constructor(
    private authService: AuthService,
    private formService: FormService
  ) {}

  ngOnInit() {
    const emailField = new EmailField({
      validations: { required: true, email: true },
    });
    const passwordField = new PasswordField({
      validations: { required: true, minLength: 4 },
    });
    const passwordConfirmField = new PasswordField({
      name: 'passwordConfirm',
      placeholder: 'repeat the above password',
      validations: { required: true },
      customValidations: matchTo(passwordField.control),
    });

    this.fields = [emailField, passwordField, passwordConfirmField];
    this.registerForm = this.formService.createFormGroup(this.fields);
  }

  onSubmitForm(value: RegisterFormValue) {
    this.authService.register(value);
  }
}
