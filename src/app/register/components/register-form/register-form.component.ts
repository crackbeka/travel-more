import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { CustomValidators } from 'src/app/shared/custom-validators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private userService: UserService,
    private auth: AngularFireAuth,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        role: ['', Validators.required],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        password_confirmation: ['', Validators.required],
      },
      {
        validator: CustomValidators.confirmPassword(
          'password',
          'password_confirmation'
        ),
      }
    );
  }

  register(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.userService.register(this.form.value).then(() => {
      this.router.navigate(['dashboard']);
    });
  }

  isInvalid(controlName: string, validation?: string): boolean | undefined {
    const control = this.form.get(controlName);
    const invalid = !control?.valid && (control?.dirty || control?.touched);
    return validation ? invalid && control?.hasError(validation) : invalid;
  }
}
