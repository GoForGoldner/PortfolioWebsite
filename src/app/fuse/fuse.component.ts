import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { BackToHomePageButtonComponent } from '../back-to-home-page-button/back-to-home-page-button.component';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'fuse',
  imports: [RouterLink, BackToHomePageButtonComponent],
  templateUrl: './fuse.component.html',
  styleUrl: './fuse.component.scss',
  standalone: true
})
export class FuseComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.setUpContentTab(), 100);
    }
  }

  private setUpContentTab() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.content-tab ul li a');

    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + 250;
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
