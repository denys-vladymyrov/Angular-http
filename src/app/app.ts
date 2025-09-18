import {Component, inject} from '@angular/core';

import { AvailablePlacesComponent } from './places/available-places/available-places.component';
import { UserPlacesComponent } from './places/user-places/user-places.component';
import {ErrorService} from './shared/error.service';
import {ErrorModalComponent} from './shared/modal/error-modal/error-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [AvailablePlacesComponent, UserPlacesComponent, ErrorModalComponent],
})
export class AppComponent {
  private errorService = inject(ErrorService);

  error = this.errorService.error;
}
