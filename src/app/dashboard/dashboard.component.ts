import { Component } from '@angular/core';
import { ButtonComponent } from '../components/button/button.component';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(
    private router: Router,
  ) {}  

  logout() {
    this.router.navigate(['login']);
    localStorage.setItem('isLoggedIn', 'false');
  }
}
