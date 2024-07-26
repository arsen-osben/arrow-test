import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [UserService]
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  errorMessage: string | null = null;
  isButtonDisabled: boolean = true;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        this.passwordContainsNumber(),
        this.passwordContainsUpperCase(),
        this.passwordContainsSpecialChar()
      ]]
    });

    this.registrationForm.statusChanges.subscribe(() => {
      this.checkFormValidity();
    });

    this.registrationForm.get('name')?.valueChanges.subscribe(() => {
      this.checkUserNameUnique();
    });
  }

  checkFormValidity(): void {
    this.isButtonDisabled = this.registrationForm.invalid || !!this.errorMessage;
  }

  checkUserNameUnique(): void {
    const name = this.registrationForm.get('name')?.value;
    if (name && !this.userService.isUserNameUnique(name)) {
      this.errorMessage = 'Користувач з таким іменем вже існує.';
      this.isButtonDisabled = true;
    } else {
      this.errorMessage = null;
      this.checkFormValidity();
    }
  }

  onRegister(): void {
    if (this.registrationForm.valid && !this.errorMessage) {
      const { name, password } = this.registrationForm.value;
      this.authService.registerUser(name, password);

      // Автоматичний вхід після успішної реєстрації
      const loginSuccessful = this.authService.login(name, password);
      if (loginSuccessful) {
        this.errorMessage = null;
        alert('Реєстрація успішна!');
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'Не вдалося автоматично увійти після реєстрації.';
        this.checkFormValidity();
      }
    } else {
      this.errorMessage = 'Будь ласка, заповніть всі поля правильно.';
      this.checkFormValidity();
    }
  }

  passwordContainsNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasNumber = /\d/.test(control.value);
      return !hasNumber ? { number: true } : null;
    };
  }

  passwordContainsUpperCase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasUpperCase = /[A-Z]/.test(control.value);
      return !hasUpperCase ? { uppercase: true } : null;
    };
  }

  passwordContainsSpecialChar(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasSpecialChar = /[!@#\$%\^&\*]/.test(control.value);
      return !hasSpecialChar ? { specialChar: true } : null;
    };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    // Застосування Force Update
    setTimeout(() => {
      this.registrationForm.get('password')?.updateValueAndValidity();
    }, 0);
  }
}
