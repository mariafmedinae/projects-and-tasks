import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-basic-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './basic-button.component.html',
  styleUrl: './basic-button.component.scss'
})
export class BasicButtonComponent {
  @Input() label = '';
  @Input() icon = '';
  @Output() onClick = new EventEmitter();

  click() {
    this.onClick.emit();
  }
}
