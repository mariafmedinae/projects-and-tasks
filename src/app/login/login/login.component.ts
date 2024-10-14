import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { AlertMessageComponent } from '../../components/alert-message/alert-message.component';
import { InputComponent } from '../../components/input/input.component';
import { ErrorsService } from '../../services/errors.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    AlertMessageComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // Form inputs an validations
  loginFormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  isLoading = false;
  loginError = '';

  constructor(
    private formBuilder: FormBuilder,
    private errorsService: ErrorsService,
    private router: Router
  ) {}

  updateInputs(input: string, event: any) {
    this.loginFormGroup.get(input)?.setValue(event);
  }

  getButtonLabel() {
    return this.isLoading ? 'Ingresando' : 'Ingresar';
  }

  login() {
    if (this.loginFormGroup.invalid) return;

    this.isLoading = true;
    this.loginError = '';
    setTimeout(() => {
      if (this.errorsService.validateUser(this.loginFormGroup.value))
        this.router.navigate(['dashboard']);
      else {
        this.isLoading = false;
        this.loginError = 'Usuario y/o contraseña inválidos';
      }
    }, 1000);
  }
}
