import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

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
      console.log(`👉 ~ file: sidebar.component.ts ~ line 20 ~ SidebarComponent ~ this.auth.user.pipe ~ user`, user);
      this.email = user?.email;
      this.userName = user?.displayName ?? this.email?.split('@')[0];
    });
  }

  logout(): void {
    this.auth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }
}
