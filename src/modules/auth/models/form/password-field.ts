import { FormField } from '@shared/models/form/form-field';
import { ValidationTypeMap } from '@shared/models/form/types';

export class PasswordField extends FormField {
  constructor(
    opts: {
      name?: string;
      placeholder?: string;
      label?: string;
      validations?: ValidationTypeMap;
      value?: string;
    } = {}
  ) {
    super({
      name: opts.name || 'password',
      placeholder: opts.placeholder ?? 'type your password',
      label: opts.label ?? 'Password',
      validations: opts.validations || {},
      type: 'password',
      value: opts.value || '',
    });
  }
}
