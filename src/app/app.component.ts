import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notConnect: boolean;
  connect: boolean;
  start: boolean;
  notStart: boolean;
  title = 'touched-damaged';

  ngOnInit() {
  }

  getUserDecon(boolean) {
    this.notConnect = boolean;
  }

  getGameStart(boolean) {
    this.start = boolean;
  }

  getGameNotStart(boolean) {
    this.notStart = boolean;
  }


}
