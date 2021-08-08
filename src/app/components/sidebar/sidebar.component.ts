import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userName?: string | null;
  email?: string | null;

  optionsOpen = false;

  constructor(private auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.auth.user.pipe().subscribe((user) => {
      this.email = user?.email;
      this.userName = user?.displayName;
    });
  }

  logout(): void {
    this.auth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }
}
