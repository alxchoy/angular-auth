import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ch-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [RouterLink],
})
export class HomeComponent {
  constructor() {
    console.log('home constructor');
  }
}
