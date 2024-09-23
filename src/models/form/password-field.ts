import { FormField } from './form-field';
import { FieldValidationsType } from './form.types';

export class PasswordField extends FormField {
  constructor(
    opts: {
      name?: string;
      label?: string;
      validations?: FieldValidationsType;
      value?: string;
    } = {},
  ) {
    super({
      name: opts.name || 'password',
      label: opts.label ?? 'Password',
      validations: opts.validations || {},
      type: 'password',
      value: opts.value || '',
    });
  }
}
