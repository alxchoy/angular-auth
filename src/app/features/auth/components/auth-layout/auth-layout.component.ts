import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'ch-auth-layout',
  standalone: true,
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
  imports: [RouterOutlet],
})
export class AuthLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log('AuthLayoutComponent');
  }
}
