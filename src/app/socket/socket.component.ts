import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.css']
})
export class SocketComponent implements OnInit {


  constructor() { }

  ngOnInit() {
    const socket = socketIo('http://localhost:3000');
    socket.on('hello', (data) => {
        console.log(data);
    })
  }

}
