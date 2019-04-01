import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  newUserForm: FormGroup;
  userConnection: FormGroup;
  connect: boolean = false;
  notConnect: boolean = true;

  constructor(private fb: FormBuilder, private userS: UserService) { }

  ngOnInit() {
    localStorage.removeItem('currentUserId') ;
    localStorage.removeItem('currentUsername') ;
    this.newUserForm = this.fb.group({
      newEmail: ['', Validators.email],
      newUsername: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
    this.userConnection = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  getconnect() {
    // console.log(localStorage.currentUserId);
    if(localStorage.currentUserId){
      this.connect = true;
      this.notConnect = false;
    } 
  }

  createNewUse() {
    console.warn(this.newUserForm.value);
    if (this.newUserForm.valid) {
      this.userS.newUser(this.newUserForm.value).subscribe((data) => {
        console.log(data);
      },
        (error) => {
          if (error.status === 404) {
            return 'Username ou mot de passe incorrect';
          }
        });
      this.newUserForm.reset();
    }
  }

  newConnection(): void {
    // console.warn(this.userConnection.value);
    if (this.userConnection.valid) {
      this.userS.getUser(this.userConnection.value).subscribe((data) => {
        // console.log(data);
        if(data){
          this.getconnect()
        }
      },
        (error) => {
          if (error.status === 404) {
            return 'Username ou mot de passe incorrect';
          }
        });
      this.userConnection.reset();
    }
  }

  logout() {
    this.connect = false;
    this.notConnect = true;
    localStorage.removeItem('currentUserId') ;
    localStorage.removeItem('currentUsername') ;
  }

}
