import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ErrorsService } from '../../services/errors.service';
import { InputComponent } from '../../components/input/input.component';
import { Subject } from 'rxjs';
import { AlertMessageComponent } from '../../components/alert-message/alert-message.component';
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, InputComponent, AlertMessageComponent, CheckboxComponent],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent {
  @Output() closeForm = new EventEmitter();
  @Output() newTask = new EventEmitter();

  clearInput: Subject<Boolean> = new Subject();

  isLoading = false;
  showAlert = false;
  alertText = '';
  alertClass = '';

  // Form inputs an validations
  formGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    completed: [false, []],
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

  // Close form an go back to tasks list
  goBack() {
    this.closeForm.emit();
  }

  saveTask() {
    if (this.formGroup.invalid) return;

    this.isLoading = true;
    this.showAlert = false;

    setTimeout(() => {
      if (this.errorsService.saveTaskForm(this.formGroup.value)) {
        this.newTask.emit(this.formGroup.value);
        this.alertText = 'Tarea creada con éxito';
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
}
