import { FormField } from './form-field';
import { FieldValidationsType } from './form.types';

export class EmailField extends FormField {
  constructor(
    opts: {
      name?: string;
      placeholder?: string;
      label?: string;
      value?: string;
      validations?: FieldValidationsType;
    } = {}
  ) {
    super({
      name: opts.name || 'email',
      placeholder: opts.placeholder ?? 'type your email',
      label: opts.label ?? 'Email',
      type: 'email',
      value: opts.value || '',
      validations: opts.validations || {},
    });
  }
}
