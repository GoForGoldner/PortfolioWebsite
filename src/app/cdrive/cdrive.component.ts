import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackToHomePageButtonComponent } from '../back-to-home-page-button/back-to-home-page-button.component';

@Component({
  selector: 'app-cdrive',
  standalone: true,
  imports: [RouterLink, BackToHomePageButtonComponent],
  templateUrl: './cdrive.component.html',
  styleUrl: './cdrive.component.scss'
})
export class CDriveComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.content-tab ul li a');

    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + 250; // Offset for better detection

      sections.forEach(section => {
        const offset = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id') ?? '';

        if (scrollPosition >= offset && scrollPosition < offset + height && id) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            const fragment = link.getAttribute('href')?.split('#')[1];
            if (fragment === id) {
              console.log("current section: " + fragment);
              link.classList.add('active');
            }
          });
        }
      });
    });
  }
}
