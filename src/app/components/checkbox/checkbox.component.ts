import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {
  @Input() clearInput:Subject<Boolean> = new Subject();
  @Input() label = '';
  @Output() onChange = new EventEmitter();

  control = new FormControl(false, []);

  ngOnInit() {
    // Clear input after form sent
    this.clearInput.subscribe(event => {
      this.control.reset();
      this.control.updateValueAndValidity({emitEvent: false});
    });
  }

  // Pass value to parent component
  change() {
    this.onChange.emit(this.control.value);
  }
}
