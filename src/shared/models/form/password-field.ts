import { ValidatorFn } from '@angular/forms';
import { FormField } from '@shared/models/form/form-field';
import { FieldValidationsType } from '@shared/models/form/form-types';

export class PasswordField extends FormField {
  constructor(
    opts: {
      name?: string;
      placeholder?: string;
      label?: string;
      validations?: FieldValidationsType;
      value?: string;
      customValidations?: ValidatorFn | ValidatorFn[];
    } = {}
  ) {
    super({
      name: opts.name || 'password',
      placeholder: opts.placeholder ?? 'type your password',
      label: opts.label ?? 'Password',
      validations: opts.validations || {},
      type: 'password',
      value: opts.value || '',
      customValidations: opts.customValidations,
    });
  }
}
