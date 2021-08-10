import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  userName?: string | null;

  userRole?: string | null;

  optionsOpen = false;

  constructor(
    private userService: UserService,
    private auth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.user.pipe().subscribe((user) => {
      this.userName = user?.displayName ?? user?.email?.split('@')[0];
    });

    this.userService.getUserRole().subscribe((role) => {
      this.userRole = {
        HOTEL: 'Hotel manager',
        ADMIN: 'Administrator',
        GUEST: 'Visitor',
      }[role];
    });
  }

  logout(): void {
    this.auth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }
}
