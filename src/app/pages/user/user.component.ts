import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public title = this.userService.user?.email;

  constructor(private readonly userService: UserService,
              private readonly router: Router) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.userService.logout();
    this.router.navigate(['login']).then();
  }

}
