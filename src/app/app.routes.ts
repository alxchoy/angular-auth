import { Routes } from '@angular/router';
import { HomeComponent } from '@features/home/home.component';
import { AuthLayoutComponent } from '@features/auth/components/auth-layout/auth-layout.component';
import { EmailVerifyComponent } from '@features/auth/pages/email-verify/email-verify.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@features/auth/auth.routes').then((m) => m.authRoutes),
      },
    ],
  },
  { path: 'email-verify', component: EmailVerifyComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
