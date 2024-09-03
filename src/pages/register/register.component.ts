import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegisterFormType } from '@models';
import { FormField, EmailField, PasswordField } from '@models/form';
import { AuthService, FormService } from '@services';
import { Button, ButtonComponent } from '@components/button';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { markAsDirtyFields } from 'helpers';

@Component({
  selector: 'ch-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [FormFieldComponent, ReactiveFormsModule, ButtonComponent],
  providers: [AuthService, FormService],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup<RegisterFormType>;
  fields!: FormField[];
  registerBtn!: Button;

  constructor(
    private authService: AuthService,
    private formService: FormService
  ) {
    this.setFormFields();
    this.registerBtn = {
      label: 'Register',
      onAction: this.onSubmitForm.bind(this),
    };
  }

  ngOnInit() {
    this.registerForm = this.formService.createFormGroup(this.fields);
  }

  onSubmitForm() {
    if (this.registerForm.invalid) {
      markAsDirtyFields(this.registerForm);
      return;
    }
    console.log(this.registerForm.value);
    const { email, password } = this.registerForm.value;
    this.authService
      .register({ email: email!, password: password! })
      .subscribe(console.log);
  }

  private setFormFields() {
    const emailField = new EmailField({
      validations: { required: true, email: true },
    });
    const passwordField = new PasswordField({
      validations: { required: true, minLength: 4 },
    });
    const passwordConfirmField = new PasswordField({
      name: 'passwordConfirm',
      label: 'Password confirm',
      placeholder: 'repeat the above password',
      validations: { required: true, matchTo: passwordField.control },
    });

    this.fields = [emailField, passwordField, passwordConfirmField];
  }
}
