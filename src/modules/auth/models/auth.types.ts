import { LoginFormGroup, RegisterFormGroup } from './auth.interfaces';

export type LoginFormValue = {
  [Property in keyof LoginFormGroup]: string;
};

export type RegisterFormValue = {
  [Property in keyof RegisterFormGroup]: string;
};
