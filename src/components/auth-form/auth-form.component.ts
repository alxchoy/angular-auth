import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Button, ButtonComponent } from '@components/button';
import { FormFieldComponent } from '@components/form-field/form-field.component';
import { LoginFormType } from '@models/auth.types';
import { FormField } from '@models/form';
import { FormService } from '@services/form.service';

@Component({
  selector: 'ch-auth-form',
  standalone: true,
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
  imports: [ReactiveFormsModule, FormFieldComponent, ButtonComponent],
})
export class AuthFormComponent<T> implements OnInit {
  @Input({ required: true }) formTitle!: string;
  @Input({ required: true }) authForm!: FormGroup;
  @Input({ required: true }) fieldsForm!: FormField[];
  @Input({ required: true }) buttonsForm!: Button[];

  constructor(private formService: FormService) {}

  ngOnInit() {
    // this.authForm = this.formService.createFormGroup(this.fields);
  }
}
