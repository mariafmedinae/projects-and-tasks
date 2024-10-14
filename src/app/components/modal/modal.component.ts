import { Component, Inject } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';
import { ErrorsService } from '../../services/errors.service';
import { BasicButtonComponent } from '../basic-button/basic-button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, MatDialogTitle, MatDialogClose, ButtonComponent, BasicButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  isLoading = false;

  constructor(
    private errorsService: ErrorsService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  getButtonLabel() {
    return this.isLoading ? 'Eliminando' : 'Eliminar';
  }

  closeModal() {this.dialogRef.close('close');}

  click() {
    this.isLoading = true;
    setTimeout(() => {
      if (this.errorsService.deleteItem(this.data))
        this.dialogRef.close(this.data);
      else {        
        this.dialogRef.close('error');
      }
    }, 1000);    
  }
}
