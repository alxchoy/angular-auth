import { Component } from '@angular/core';

@Component({
  selector: 'ch-home',
  standalone: true,
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor() {
    console.log('home constructor');
  }
}
