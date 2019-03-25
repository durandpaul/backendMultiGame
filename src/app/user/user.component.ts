import { Component, OnInit, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { UserServiceService } from '../user-service.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  newUserForm: FormGroup;
  userConnection: FormGroup;
  notConnect: boolean;
  connect: boolean;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.notConnect = true;
    this.connect = false;
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

  createNewUse(){
    console.warn(this.newUserForm.value);
    if (this.newUserForm.valid) {
      this.newUserForm.reset();
    } else {

    }
  }

  newConnection(){
    console.warn(this.userConnection.value);
    if (this.userConnection.valid) {
      this.userConnection.reset();
    } else {

    }
  }

}
