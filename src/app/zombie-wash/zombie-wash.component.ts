import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { BackToHomePageButtonComponent } from '../back-to-home-page-button/back-to-home-page-button.component';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'zombie-wash',
  imports: [RouterLink, BackToHomePageButtonComponent],
  templateUrl: './zombie-wash.component.html',
  styleUrl: './zombie-wash.component.scss',
  standalone: true
})
export class ZombieWashComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.setUpContentTab();
        this.loadWebGLBuild();
      }, 100);
    }
  }

  private setUpContentTab() {
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

  private loadWebGLBuild() {
    const container = document.querySelector("#unity-container");
    const canvas = document.querySelector("#unity-canvas") as HTMLCanvasElement;
    const loadingBar = document.querySelector("#unity-loading-bar") as HTMLElement;
    const progressBarFull = document.querySelector("#unity-progress-bar-full") as HTMLElement;
    const fullscreenButton = document.querySelector("#unity-fullscreen-button") as HTMLElement;
    const warningBanner = document.querySelector("#unity-warning") as HTMLElement;

    if (!canvas || !loadingBar || !progressBarFull) {
      console.error('Unity DOM elements not found');
      return;
    }

    // Unity banner function
    const unityShowBanner = (msg: string, type: string) => {
      const updateBannerVisibility = () => {
        warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
      };
      const div = document.createElement('div');
      div.innerHTML = msg;
      warningBanner.appendChild(div);
      if (type == 'error') div.style.cssText = 'background: red; padding: 10px;';
      else {
        if (type == 'warning') div.style.cssText = 'background: yellow; padding: 10px;';
        setTimeout(() => {
          if (warningBanner.contains(div)) {
            warningBanner.removeChild(div);
          }
          updateBannerVisibility();
        }, 5000);
      }
      updateBannerVisibility();
    };

    const buildUrl = "ZombieWash/ZombieWashBuild/Build";
    const loaderUrl = buildUrl + "/Builds.loader.js";

    const config = {
      dataUrl: buildUrl + "/Builds.data.gz",
      frameworkUrl: buildUrl + "/Builds.framework.js.gz",
      codeUrl: buildUrl + "/Builds.wasm.gz",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "GoForGoldner",
      productName: "ZombieWash",
      productVersion: "0.1",
      showBanner: unityShowBanner,
    };

    loadingBar.style.display = "block";

    // Load Unity
    const script = document.createElement("script");
    script.src = loaderUrl;

    script.onload = () => {
      console.log("Unity loader script loaded from:", loaderUrl);
      const createUnityInstance = (window as any).createUnityInstance;
      createUnityInstance(canvas, config, (progress: number) => {
        progressBarFull.style.width = 100 * progress + "%";
        console.log("Loading progress:", (progress * 100).toFixed(1) + "%");
      }).then((unityInstance: any) => {
        console.log("Unity instance created successfully");
        loadingBar.style.display = "none";
        if (fullscreenButton) {
          fullscreenButton.onclick = () => {
            unityInstance.SetFullscreen(1);
          };
        }
      }).catch((message: any) => {
        console.error("Unity loading failed:", message);
        alert("Failed to load game: " + message);
      });
    };

    script.onerror = () => {
      console.error("Failed to load Unity loader script from:", loaderUrl);
      alert("Could not load Unity loader script. Check the file path and server.");
    };

    console.log("Attempting to load Unity script from:", loaderUrl);
    document.body.appendChild(script);
  }
}
