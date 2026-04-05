import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUser } from '../dailybytes-interfaces/user';
import { UserService } from '../dailybytes-services/user-service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  usernamesList: string[] = [];
  usernameAvl: boolean = true;
  usernameMsg: string = "";
  today: string = "";
  constructor(private readonly _userService: UserService, private readonly router: Router) {

  }

  ngOnInit() {
    this.today = new Date().toISOString().split('T')[0];
    console.log("Component Mounted");
    let userLoggedIn = sessionStorage.getItem("userName");
    if (userLoggedIn) {
      this.router.navigate(['/']);
    }
    this.getAllUsernames();
  }

  submitRegisterForm(form: NgForm) {
    console.log(form.value);
    const userObj: IUser = {
      userId: 0,
      firstName: form.value.fName,
      lastName: form.value.lName,
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
      gender: form.value.gender,
      dateOfBirth: form.value.dateOfBirth,
      address: form.value.address,
      contactNumber: form.value.contactNo,
      profilePicture: "null",
      roleId: 1,
      membership: "Primary"
    }

    this._userService.registerUser(userObj).subscribe(
      responseData => {
        console.log("Response ==> ", responseData);
        if (responseData) {
          alert("User Registered Successfully, Redirecting to login...");
          this.router.navigate(['/login']);
        } else {
          alert("Registration Failed, Please try again!");
        }
      },
      responseError => {
        alert(responseError);
        console.log("Error ==> ", responseError);
      },
      () => console.log("registerUser executed !")
    )
  }

  getAllUsernames() {
    this._userService.getAllUsernames().subscribe(
      responseData => {
        this.usernamesList = responseData;
      },
      responseError => {
        this.usernamesList = [];
      },
      () => console.log("Usernames fetched!")
    )
  }
  checkUsernameAvailability(username: string) {
    let flag = false;
    this.usernamesList.forEach(uname => {
      if (uname.toLowerCase() === username.trim().toLowerCase()) {
        flag = true;
        this.usernameAvl = false;
        this.usernameMsg = "Username taken"
      }
    })
    if (!flag) {
      this.usernameAvl = false;
      this.usernameMsg = "Username Available"
    }

  }
}
