import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'back-to-home-page-button',
  imports: [],
  templateUrl: './back-to-home-page-button.component.html',
  styleUrl: './back-to-home-page-button.component.scss'
})
export class BackToHomePageButtonComponent {
  public constructor(private router: Router) { }

  public loadHomePage() {
    this.router.navigate(['']);
  }
}
