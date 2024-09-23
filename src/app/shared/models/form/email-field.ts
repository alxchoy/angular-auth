import { FormField, FieldValidationsType } from './form-field';

export class EmailField extends FormField {
  constructor(
    opts: {
      name?: string;
      label?: string;
      value?: string;
      validations?: FieldValidationsType;
    } = {},
  ) {
    super({
      name: opts.name || 'email',
      label: opts.label ?? 'Email',
      type: 'email',
      value: opts.value || '',
      validations: opts.validations || {},
    });
  }
}
