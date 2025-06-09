import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CDriveComponent } from './cdrive/cdrive.component';
import { ComingSoonPageComponent } from './coming-soon-page/coming-soon-page.component';
import { FuseComponent } from './fuse/fuse.component';
import { ZombieWashComponent } from './zombie-wash/zombie-wash.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Tyler Goldner'
  },
  {
    path: 'cdrive',
    component: CDriveComponent,
    title: 'CDrive'
  },
  {
    path: 'zombiewash',
    component: ZombieWashComponent,
    title: 'ZombieWash'
  },
  {
    path: 'fuse',
    component: FuseComponent,
    title: 'Fuse Filesystem'
  },
  {
    path: 'coming-soon',
    component: ComingSoonPageComponent,
    title: 'Coming Soon!'
  }
];
