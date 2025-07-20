import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { UsersPostsComponent } from './component/users-posts/users-posts.component';
import { RequestsComponent } from './component/requests/requests.component';
import { AlbumsComponent } from './component/albums/albums.component';
import { ErrorComponent } from './component/error/error.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Inicio',
  },
  {
    path: 'users-posts',
    component: UsersPostsComponent,
    title: 'Usuarios y Posts',
  },
  {
    path: 'requests',
    component: RequestsComponent,
    title: 'Peticiones',
  },
  {
    path: 'albums',
    component: AlbumsComponent,
    title: 'Álbumes',
  },

  {
    path: 'error',
    component: ErrorComponent,
    title: 'Error',
    data: {
      errorCode: 500,
      errorTitle: 'Error del servidor',
      errorMessage: 'Ocurrió un error inesperado.',
    },
  },
  {
    path: '404',
    component: ErrorComponent,
    title: 'Página no encontrada',
    data: {
      errorCode: 404,
      errorTitle: 'Página no encontrada',
      errorMessage: 'La página que buscas no existe.',
    },
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
