import { FormControl } from '@angular/forms';

export interface LoginFormGroup {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface RegisterFormGroup {
  email: FormControl<string>;
  password: FormControl<string>;
  passwordVerification: FormControl<string>;
}
