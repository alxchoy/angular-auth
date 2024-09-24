import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { AuthLayoutComponent } from '@features/auth/components/auth-layout/auth-layout.component';

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
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
