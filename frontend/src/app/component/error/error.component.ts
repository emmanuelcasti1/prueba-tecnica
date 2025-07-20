import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent {
  @Input() errorCode: number = 404;
  @Input() errorTitle: string = 'Página no encontrada';
  @Input() errorMessage: string =
    'Lo sentimos, no pudimos encontrar la página que estás buscando.';
  @Input() showHomeButton: boolean = true;

  reloadPage(): void {
    window.location.reload();
  }
}
