import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../components/input/input.component';
import { AlertMessageComponent } from '../../components/alert-message/alert-message.component';
import { Subject } from 'rxjs';
import { ErrorsService } from '../../services/errors.service';

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    AlertMessageComponent,
  ],
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.scss',
})
export class NewProjectComponent {
  @Output() closeForm = new EventEmitter();
  @Output() newProject = new EventEmitter();

  clearInput: Subject<Boolean> = new Subject();

  isLoading = false;
  showAlert = false;
  alertText = '';
  alertClass = '';

  // Form inputs an validations
  formGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    username: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private errorsService: ErrorsService
  ) {}

  updateInputs(input: string, event: any) {
    this.formGroup.get(input)?.setValue(event);
  }

  getButtonLabel() {
    return this.isLoading ? 'Creando' : 'Crear';
  }

  saveProject() {
    if (this.formGroup.invalid) return;

    this.isLoading = true;
    this.showAlert = false;

    setTimeout(() => {
      if (this.errorsService.saveProjectForm(this.formGroup.value)) {
        this.newProject.emit(this.formGroup.value);
        this.alertText = 'Proyecto creado con éxito';
        this.alertClass = 'alert-success';
        
        // Clear inputs
        this.clearInput.next(true);
        this.formGroup.reset();
        this.formGroup.updateValueAndValidity({ emitEvent: false });
      } else {
        this.alertText = 'Se presentó un error. Vuelva a intentarlo';
        this.alertClass = 'alert-danger';
      }
      this.showAlert = true;
      this.isLoading = false;
    }, 1000);
  }

  // Close form an go back to projects list
  goBack() {
    this.closeForm.emit();
  }
}
