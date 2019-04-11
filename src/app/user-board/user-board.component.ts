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
  fleetAlive: number;
  score: number;
  currentUserData: any = '';
  on: boolean = false;
  off: boolean = true
  @Input() notGame: boolean;
  @Input() game: boolean;
  @Input() newAdverser: boolean;
  // @Input() newClick: boolean;
  constructor(private userS: UserService, private dataS: DatagameService) { }

  ngOnInit() {
    this.currentUser = sessionStorage.currentUsername;
    this.displayCurrentUser();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.on = this.game;
    this.off = this.notGame;
    this.adverser = sessionStorage.adverser;
    if(this.adverser !== undefined)
      this.displayAdverserData(this.adverser);
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
          return 'Problème de données';
        }
      });
  }

  displayAdverserData(adverser) {
    console.log('this.adverser', adverser);
    this.dataS.getDataRFleet(adverser).subscribe((data) => {
      // console.log('getDataRFleet', data);

      if (data) {
        this.fleetAlive = data.fleet.shipalive;
        // console.log(this.fleetAlive);
      }
    },
      (error) => {
        if (error.status === 404) {
          return 'Problème de données';
        }
      });

    this.userS.getUser(adverser).subscribe((data) => {
      // console.log('displayAdverserData ', data);

      if (data) {
        this.score = data.user.score;
        // console.log(this.currentUserData);
      }
    },
      (error) => {
        if (error.status === 404) {
          return 'Problème de données';
        }
      });


  }


}
