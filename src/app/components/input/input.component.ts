import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() clearInput:Subject<Boolean> = new Subject();
  @Input() label = '';
  @Input() type = '';
  @Input() icon = '';
  @Output() onChange = new EventEmitter(); 
   
  control = new FormControl('', [Validators.required]);
  errorMessage = 'Este campo es obligatorio';

  // Set validators
  ngOnInit() {
    if(this.type === 'password') this.control.setValidators([Validators.required, Validators.minLength(8)]);
    else this.control.setValidators([Validators.required]);

    // Clear input after form sent
    this.clearInput.subscribe(event => {
      this.control.reset();
      this.control.updateValueAndValidity({emitEvent: false});
    });
  }  

  // Update error message
  getError() {
    if(this.control.hasError('required')) this.errorMessage = 'Este campo es obligatorio';
    else this.errorMessage = 'Debe contener mínimo 8 caracteres';
  }

  // Pass value to parent component
  change(event: any) {
    this.onChange.emit(event.target.value);
    this.getError();
  }
}
