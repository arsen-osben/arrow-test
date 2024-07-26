import {Component} from '@angular/core';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CommonModule} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (this.authService.login(username, password)) {
        this.errorMessage = null;
        this.router.navigate(['/test-editor']); // Перенаправлення на редактор тестів
      } else {
        this.errorMessage = 'Невірне ім\'я або пароль.';
      }
    } else {
      this.errorMessage = 'Будь ласка, заповніть всі поля правильно.';
    }
  }

}
