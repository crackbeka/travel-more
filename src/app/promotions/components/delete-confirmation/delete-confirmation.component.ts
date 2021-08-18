import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent {

  @Output()
  cancel = new EventEmitter<void>();

  @Output()
  confirm = new EventEmitter<void>();

}
