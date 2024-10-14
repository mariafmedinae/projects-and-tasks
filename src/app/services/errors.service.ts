import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {
  // valid user credentials
  validUser = {
    username: 'innclod',
    password: 'innclod2024'
  }

  constructor() { }

  // Login validation
  validateUser(data: any): boolean {    
    if((data.username === this.validUser.username) && (data.password === this.validUser.password)) {
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    } else return false;
  }

  // If name input name conteins @ thrown an error
  saveProjectForm(data: any) {
    return !data.name.includes('@');
  }

  // If name input title conteins @ thrown an error
  saveTaskForm(data: any) {
    return !data.title.includes('@');
  }

  // If delete item has an id equal to 3 returns error
  deleteItem(data: any) {
    return !(data.id === 3);
  }
}
