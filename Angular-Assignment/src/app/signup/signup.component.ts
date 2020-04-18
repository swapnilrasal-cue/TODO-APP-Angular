import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: '/signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  imageUrl: any = '../../assets/images/profile-pic.png';
  formError: any = false;
  userCreated: boolean = false;
  isFetching: boolean = false;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.userService.checkLoggedInUser();
    this.userService.userAuth.subscribe((userData) => {
      if (userData) {
        this.router.navigate(['/todo-list']);
      }
    })

    this.signupForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'gender': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'profileImage': new FormControl(null)
    })
  }

  UploadProfilePicture(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.imageUrl = reader.result;
      }
    }
  }

  onSignup() {
    console.log(this.signupForm);
    if (!this.signupForm.valid) {
      this.formError = true;
      return false;
    }
    this.isFetching = true;
    const newUser = new User(
      this.signupForm.value.email,
      this.signupForm.value.password,
      this.signupForm.value.firstName,
      this.signupForm.value.lastName,
      this.signupForm.value.address,
      this.signupForm.value.gender,
      this.imageUrl
    );

    this.userService.addUser(newUser).subscribe((responseData) => {
        this.formError = false;
        this.userCreated = true;
        this.signupForm.reset();
        setTimeout(() => {
          this.isFetching = false;
          this.router.navigate(['/login']);
        }, 500);

      }, (error) => {
        this.formError = error;
        console.log(this.formError);
        this.isFetching = false;
      }
    );
  }
}
