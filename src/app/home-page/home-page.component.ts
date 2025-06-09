import { Component, ElementRef, ViewChild, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'home-page',
  imports: [NavBarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  standalone: true
})
export class HomePageComponent implements AfterViewInit {
  @ViewChild('ZombieWashVideo') zombieWashVideoRef!: ElementRef<HTMLVideoElement>;

  public constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.addVideoAnimation();
      this.addPageLeaveAnimation();
    }, 100);
  }

  private addVideoAnimation() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.zombieWashVideoRef?.nativeElement) return;

      const projectElement = this.zombieWashVideoRef.nativeElement.parentElement;
      if (!projectElement) return;

      projectElement.addEventListener('mouseenter', () =>
        this.zombieWashVideoRef.nativeElement.play()
      );

      projectElement.addEventListener('mouseleave', () => {
        setTimeout(() => {
          this.zombieWashVideoRef.nativeElement.pause()
        }, 350);
      });

    }
  }

  private addPageLeaveAnimation(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Selects all the divs with a project class name!
      let items = document.querySelectorAll('div.project');
      let navBar = document.querySelector('nav-bar');

      items.forEach(item => {
        item.addEventListener('click', () => {
          items.forEach(allItems => {
            if (!allItems.classList.contains('animate-leave')) {
              console.log('Adding animate-leave to:', allItems.id);
              allItems.classList.add('animate-leave');
              // Verify class was added
              console.log('Class list after:', allItems.classList.contains('animate-leave'));
            }
          });

          if (!navBar?.classList.contains('animate-nav-links')) {
            navBar?.classList.add('animate-nav-links');
          }
        })
      });
    }
  }

  public loadComingSoonPage() {
    setTimeout(() => this.router.navigate(['coming-soon']), 250);
  }

  public loadCDrivePage() {
    setTimeout(() => this.router.navigate(['cdrive']), 250);
  }

  public loadZombieWashPage() {
    setTimeout(() => this.router.navigate(['zombiewash']), 250);
  }

  public loadFusePage() {
    setTimeout(() => this.router.navigate(['fuse']), 250);
  }
}
