import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { UserService } from '../user.service';
import { DatagameService } from '../datagame.service';



@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})
export class UserBoardComponent implements OnInit, OnChanges, DoCheck {

  currentUser: string;
  adverser: string;
  fleetAlive = '';
  score = '';
  currentUserData: any;
  on: boolean = false;
  off: boolean = true
  @Input() notGame: boolean;
  @Input() game: boolean;
  @Input() newAdverser: boolean;
  @Input() newClick: boolean;
  constructor(private userS: UserService, private dataS: DatagameService) { }

  ngOnInit() {
    this.currentUser = sessionStorage.currentUsername;
    this.displayCurrentUser();
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('changes ', changes);
    this.on = this.game;
    this.off = this.notGame;
    if (this.newAdverser || this.newClick) {
      this.adverser = sessionStorage.adverser;
      this.displayAdverserData();
    }
  }

  ngDoCheck() {
    this.adverser = sessionStorage.adverser;

  }

  displayCurrentUser() {
    this.userS.getUser(this.currentUser).subscribe((data) => {
      if (data) {
        this.currentUserData = data.user;
      }
    },
      (error) => {
        if (error.status === 404) {
          return 'Username ou mot de passe incorrect';
        }
      });
  }

  displayAdverserData() {
    console.log('this.adverser', this.adverser);
    this.dataS.getDataRFleet(this.adverser).subscribe((data) => {
      console.log('getDataRFleet', data);

      if (data) {
        this.fleetAlive = data.user.shipalive;
        console.log(this.fleetAlive);
      }
    },
      (error) => {
        if (error.status === 404) {
          return 'Username ou mot de passe incorrect';
        }
      });

    this.userS.getUser(this.adverser).subscribe((data) => {
      console.log('displayAdverserData ', data);

      if (data) {
        this.score = data.user.score;
        console.log(this.currentUserData);
      }
    },
      (error) => {
        if (error.status === 404) {
          return 'Username ou mot de passe incorrect';
        }
      });


  }


}
