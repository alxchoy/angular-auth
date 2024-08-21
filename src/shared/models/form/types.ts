import { ValidatorFn } from '@angular/forms';

type ValidationTypes = 'required' | 'maxLength' | 'minLength';

// export type ValidationTypeMap = {
//   [key in ValidationTypes]?: number | string | boolean;
// };

export type ValidationTypeMap = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
};

export type ValidatorAngularMap = {
  [Property in keyof ValidationTypeMap]: ValidatorFn | boolean;
};
