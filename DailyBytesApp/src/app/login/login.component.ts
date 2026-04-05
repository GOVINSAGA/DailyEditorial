import { Component ,OnInit} from '@angular/core';
import { UserService } from '../dailybytes-services/user-service/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../dailybytes-services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  status: string = '';
  msg: string = '';
  errorMsg: string = '';
  showDiv: boolean = false;

  constructor(private readonly userService: UserService, private readonly authService: AuthService, private readonly router: Router) {

  }

  ngOnInit() {
    console.log("Login Mounted");
  }

  submitLoginForm(form: NgForm) {
    if (form.invalid) {
      this.msg = 'Please enter valid credentials';
    }

    this.userService.loginUser(form.value.email, form.value.password).subscribe(
      responseData => {
        this.showDiv = true;
        if (responseData) {
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('userId', responseData.userId.toString());
          sessionStorage.setItem('userName', responseData.userName);
          sessionStorage.setItem('userEmail', responseData.emailId);
          sessionStorage.setItem('roleId', responseData.roleId.toString());

          const roleId = responseData.roleId;
          if (roleId === 1) {
            this.router.navigate(['/view-article']);
          } else if (roleId === 2) {
            this.router.navigate(['/journalist'])
          } else if (roleId === 3) {
            this.router.navigate(['/editor']);
          } else if (roleId === 4) {
            this.router.navigate(['/chief-editor/articles']);
          }

        } else {
          this.msg = "Invalid Credentials"
        }
      },
      responseError => {
        this.errorMsg = responseError;
        this.msg = "Server error.Please try again later";
        this.showDiv = true;
      },
      () => console.log("Submit Login Form executed successfully")
    )
  }

  logout() {
    this.authService.logout();
  }

}
