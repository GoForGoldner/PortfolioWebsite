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

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile && isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.setUpContentTab(), 100);
    }
  }

  private setUpContentTab() {
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + 300;
      sections.forEach(section => {
        const offset = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id') ?? '';
        if (scrollPosition >= offset && scrollPosition < offset + height && id) {
          sections.forEach(sectionAll => {
            if (sectionAll != section && sectionAll.classList.contains('active')) {
              sectionAll.classList.remove('active');
              sectionAll.classList.add('leaving-active');
              // Remove the leaving class after animation completes
              setTimeout(() => sectionAll.classList.remove('leaving-active'), 350);
            }
          });
          section.classList.add('active');
        }
      });
    });
  }


  private addVideoAnimation() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.zombieWashVideoRef?.nativeElement) return;

      const projectElement = this.zombieWashVideoRef.nativeElement.parentElement;
      if (!projectElement) return;

      projectElement.addEventListener('mouseenter', () => {
        try { this.zombieWashVideoRef.nativeElement.play(); } catch (error) { console.log("User hasn't clicked on website yet. Video can't load..."); return; }
      });

      projectElement.addEventListener('mouseleave', () => {
        setTimeout(() => {
          this.zombieWashVideoRef.nativeElement.pause()
        }, 350);
      });

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const target = mutation.target as HTMLElement;
            if (target.classList.contains('active')) {
              try { this.zombieWashVideoRef.nativeElement.play(); } catch (error) { }
            } else {
              // Add delay to match your animation timing
              setTimeout(() => {
                this.zombieWashVideoRef.nativeElement.pause();
              }, 350);
            }
          }
        });
      });

      // Start observing
      observer.observe(projectElement, {
        attributes: true,
        attributeFilter: ['class']
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
