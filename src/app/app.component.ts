import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  notConnect: boolean;
  connect: boolean;

  ngOnInit() {
    this.notConnect = true;
    this.connect = false;

  }
  title = 'touched-damaged';
}
