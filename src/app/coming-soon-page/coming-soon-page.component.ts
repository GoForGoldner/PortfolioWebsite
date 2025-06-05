import { Component } from '@angular/core';
import { BackToHomePageButtonComponent } from '../back-to-home-page-button/back-to-home-page-button.component';

@Component({
  selector: 'coming-soon-page',
  imports: [BackToHomePageButtonComponent],
  templateUrl: './coming-soon-page.component.html',
  styleUrl: './coming-soon-page.component.scss',
  standalone: true
})
export class ComingSoonPageComponent {

}
