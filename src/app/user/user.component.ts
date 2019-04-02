import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { SocketService } from '../socket.service';

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
  @Output() loginEvent: EventEmitter<boolean> = new EventEmitter();
  @Input() start: boolean;
  @Input() notStart: boolean;


  constructor(private fb: FormBuilder, private userS: UserService, private socketS: SocketService) { }

  ngOnInit() {
    if(sessionStorage.length === 2) {
      sessionStorage.clear();
      this.notConnect = false;
      this.connect = true;
    }

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
    if(sessionStorage.currentUserId){
      this.notConnect = false;
      this.connect = true;
    } 
  }

  createNewUse() {
    if (this.newUserForm.valid) {
      this.userS.newUser(this.newUserForm.value).subscribe((data) => {
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
    if (this.userConnection.valid) {
      this.userS.login(this.userConnection.value).subscribe((data) => {
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
    this.socketS.disconnectToSo();
    this.loginEvent.emit(this.notConnect);
    sessionStorage.clear();
  }

}
