import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/shared/custom-validators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      password_confirmation: ['', Validators.required],
    }, {
      validator: CustomValidators.confirmPassword('password', 'password_confirmation'),
    });
  };

  register(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.auth.createUserWithEmailAndPassword(this.form.get('email')?.value, this.form.get('password')?.value).then((credentials) => {
      credentials.user?.updateProfile({ displayName: `${this.form.get('first_name')?.value} ${this.form.get('last_name')?.value}` });

      this.router.navigate(['dashboard']);
    });
  }

  isInvalid(controlName: string, validation?: string): boolean | undefined {
    const control = this.form.get(controlName);
    const invalid = !control?.valid && (control?.dirty || control?.touched);
    return validation ? invalid && control?.hasError(validation) : invalid;
  }

}
