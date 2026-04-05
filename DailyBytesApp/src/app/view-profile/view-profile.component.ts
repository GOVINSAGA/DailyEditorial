import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../dailybytes-services/user-service/user.service';
import { IUser } from '../dailybytes-interfaces/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})

/**  PROMPT:
 *  -hey you are a Angular DOTNET fullstack expert and i have given you some context of the file and you can also go through my whole project.
 * -You need to create a route for view-profile and corresponding component and while viewing the profile user can update his/her profile.
 * -Write a stored procedure for updating the profile and all required repository (inside DailyBytesRespository.cs) and service layer in (UserController.cs)
 * -I have also given you some css files, you can take reference from the those files.
 */
export class ViewProfileComponent implements OnInit {
  user: IUser = {
    userId: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    gender: 'Male',
    dateOfBirth: new Date(),
    address: '',
    contactNumber: '',
    profilePicture: '',
    roleId: 0,
    membership: ''
  };

  isLoggedIn: boolean = false;
  roleId: number = 0;
  userName: string | null = '';
  userId: number = 0;
  isEditMode: boolean = false;
  msg: string = '';
  showMsg: boolean = false;
  msgType: string = '';
  defaultProfileImage: string = 'assets/chief-editor-1.png';

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    this.userName = sessionStorage.getItem('userName');
    this.roleId = Number(sessionStorage.getItem('roleId'));
    this.userId = Number(sessionStorage.getItem('userId'));

    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getUserById(this.userId).subscribe(
      (data: any) => {
        if (data) {
          this.user = {
            userId: data.userId,
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            email: data.email,
            password: data.password,
            gender: data.gender === 'M' ? 'Male' : data.gender === 'F' ? 'Female' : 'Other',
            dateOfBirth: new Date(data.dateOfBirth),
            address: data.address || '',
            contactNumber: data.contactNumber || '',
            profilePicture: data.profilePictureUrl || this.getDefaultProfileImage(data.gender),
            roleId: data.roleId,
            membership: data.membership || ''
          };
        }
      },
      (error) => {
        console.error('Error loading profile:', error);
        this.showMessage('Error loading profile. Please try again.', 'error');
      }
    );
  }

  getDefaultProfileImage(gender: string): string {
    if (gender === 'M') {
      return 'assets/chief-editor-1.png';
    } else if (gender === 'F') {
      return 'assets/chief-editor-1.png';
    } else {
      return 'assets/chief-editor-1.png';
    }
  }

  getProfileImage(): string {
    if (this.user.profilePicture && this.user.profilePicture !== '') {
      return this.user.profilePicture;
    }
    return this.getDefaultProfileImage(this.user.gender === 'Male' ? 'M' : this.user.gender === 'Female' ? 'F' : 'O');
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.loadUserProfile();
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.showMessage('Please fill all required fields correctly.', 'error');
      return;
    }

    const updateData: any = {
      userId: this.user.userId,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      gender: this.user.gender,
      contactNumber: this.user.contactNumber,
      dateOfBirth: this.user.dateOfBirth,
      address: this.user.address
    };

    this.userService.updateUserProfile(updateData).subscribe(
      (response: boolean) => {
        if (response) {
          this.showMessage('Profile updated successfully!', 'success');
          this.isEditMode = false;
          sessionStorage.setItem('userName', this.user.username);
          this.loadUserProfile();
        } else {
          this.showMessage('Failed to update profile. Please try again.', 'error');
        }
      },
      (error) => {
        console.error('Error updating profile:', error);
        this.showMessage('Error updating profile. Please try again.', 'error');
      }
    );
  }

  showMessage(message: string, type: string) {
    this.msg = message;
    this.msgType = type;
    this.showMsg = true;

    setTimeout(() => {
      this.showMsg = false;
    }, 5000);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  navigateToHome() {
    if (this.roleId === 1) {
      this.router.navigate(['/view-article']);
    } else if (this.roleId === 2) {
      this.router.navigate(['/journalist']);
    } else if (this.roleId === 3) {
      this.router.navigate(['/editor']);
    } else if (this.roleId === 4) {
      this.router.navigate(['/chief-editor/articles']);
    }
  }

  getRoleName(): string {
    switch (this.roleId) {
      case 1:
        return 'User';
      case 2:
        return 'Journalist';
      case 3:
        return 'Editor';
      case 4:
        return 'Chief Editor';
      default:
        return 'Unknown';
    }
  }
}
