import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loadCounter = 0;
  public isRetry = false;

  public emailControl = new FormControl('', [Validators.required, Validators.email]);
  public passwordControl = new FormControl('', [Validators.required, Validators.minLength(10)])

  constructor(private readonly userService: UserService,
              private readonly router: Router) { }

  async ngOnInit(): Promise<void> {
    if (this.userService.isLogin) {
      await this.goToHome();
    }
  }

  public async login(): Promise<void> {
    this.loadCounter += 1;
    if (await this.userService.login(this.emailControl.value, this.passwordControl.value)) {
      this.isRetry = false;
      await this.goToHome();
    }
    else {
      this.isRetry = true;
    }
    this.loadCounter -= 1;
  }

  private async goToHome(): Promise<void> {
    await this.router.navigate(['user', 'test']);
  }

}
