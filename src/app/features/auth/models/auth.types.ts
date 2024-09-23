import { FormControl } from '@angular/forms';

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export type LoginFormType = {
  [Property in keyof Login]: FormControl<string>;
};

export type RegisterFormType = {
  [Property in keyof Register]: FormControl<string>;
};

export type LoginReq = {
  email: string;
  password: string;
};

export type RegisterReq = {
  email: string;
  password: string;
  fullName: string;
};

export type AuthRes = {
  user: {
    id: string;
    email: string;
  };
};
