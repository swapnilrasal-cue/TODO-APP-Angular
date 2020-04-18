import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.userAuth.subscribe(auth => {
      this.isAuthenticated = false;
      if (auth) {
        this.isAuthenticated = true;
      }
    })
  }

  onLogout() {
    this.userService.logout();
  }

}
