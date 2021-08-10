import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private userService: UserService,
    private auth: AngularFireAuth,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (!this.form.valid) {
      return;
    }

    this.userService.login(this.form.value).then(() => {
      this.router.navigate(['dashboard']);
    });
  }

  isInvalid(controlName: string, validation?: string): boolean | undefined {
    const control = this.form.get(controlName);
    const invalid = !control?.valid && (control?.dirty || control?.touched);
    return validation ? invalid && control?.hasError(validation) : invalid;
  }
}
