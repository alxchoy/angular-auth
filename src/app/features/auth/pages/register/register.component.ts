import { Component, OnInit } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { AuthService, FormService, LoaderService } from "@core/services";
import { RegisterFormType } from "@features/auth/models/auth.types";
import {
  EmailField,
  FormField,
  PasswordField,
  TextField,
} from "@shared/models/form";
import {
  Button,
  ButtonComponent,
} from "@shared/components/button/button.component";
import { FormFieldComponent } from "@shared/components/form-field/form-field.component";
import { markAsTouchedFields } from "@shared/helpers/form-helper";

@Component({
  selector: "ch-register",
  standalone: true,
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
  imports: [
    FormFieldComponent,
    ReactiveFormsModule,
    CommonModule,
    ButtonComponent,
  ],
  providers: [AuthService, FormService],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup<RegisterFormType>;
  fields!: FormField[];
  buttons!: Button[];
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private formService: FormService,
    private loaderService: LoaderService,
  ) {
    this.isLoading$ = this.loaderService.loader$;
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
      name: "fullName",
      label: "Full name",
      validations: { required: true },
    });
    const emailField = new EmailField({
      validations: { required: true, email: true },
    });
    const passwordField = new PasswordField({
      validations: { required: true, minLength: 6 },
    });
    const passwordConfirmField = new PasswordField({
      name: "passwordConfirm",
      label: "Password confirm",
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
      { label: "Register", onAction: this.onSubmitForm.bind(this) },
      { label: "Login", type: "link", goTo: "/login", class: "outline" },
    ];
  }
}
