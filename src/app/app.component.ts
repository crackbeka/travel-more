import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //
  title = 'travel-more';

  //
  form!: FormGroup;

  //
  constructor(private fb: FormBuilder, private auth: AngularFireAuth) {}

  //
  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  //
  register(): void {
    if (!this.form.valid) {
      return;
    }

    this.auth.createUserWithEmailAndPassword(this.form.value.email, this.form.value.password);
  }
}
