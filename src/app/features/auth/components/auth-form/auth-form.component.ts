import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '@core/services/form.service';
import {
  Button,
  ButtonComponent,
} from '@shared/components/button/button.component';
import { FormFieldComponent } from '@shared/components/form-field/form-field.component';
import { FormField } from '@shared/models/form';

@Component({
  selector: 'ch-auth-form',
  standalone: true,
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
  imports: [ReactiveFormsModule, FormFieldComponent, ButtonComponent],
})
export class AuthFormComponent implements OnInit {
  @Input({ required: true }) formTitle!: string;
  @Input({ required: true }) authForm!: FormGroup;
  @Input({ required: true }) fieldsForm!: FormField[];
  @Input({ required: true }) buttonsForm!: Button[];

  constructor(private formService: FormService) {}

  ngOnInit() {}
}
