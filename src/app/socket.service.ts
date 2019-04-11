import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: any;

  constructor() {
  // Changer avant remise sur Heroku
    this.socket = socketIo('http://localhost:3000');

  }

  sendRandomFleet(fleetData: any) {

    this.socket.emit('sendRandFleet', fleetData);
  }

  sendClickPos(posX: number, posY: number, callback) {

    this.socket.emit('sendClickPos', {
      posx: posX,
      posy: posY
    });

    this.socket.on('returnClickPos', (data) => {
      callback(data);
    });

  }

  connectToSo(username: string) {
    this.socket.emit('joinparty', username);

    this.socket.on('waiting-adverser', (data) => {
    });

    this.socket.on('newparty', (data) => {
      sessionStorage.setItem('gameon', data.start);
      
      if (sessionStorage.currentUsername === data.users[0]) {
        sessionStorage.setItem('adverser', data.users[1]);
      } else {
        sessionStorage.setItem('adverser', data.users[0]);
      }
    });
  }

  disconnectToSo() {
    this.socket.emit('leave');
    this.socket.emit('disconnect');
  }

}