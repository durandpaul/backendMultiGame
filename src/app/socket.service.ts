import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: any;

  constructor() {
    this.socket = socketIo('/');

  }

  sendRandomFleet(fleetData: any) {
    // console.log('fleetData', fleetData);

    this.socket.emit('sendRandFleet', fleetData);
  }

  sendClickPos(posX: number, posY: number, callback) {

    this.socket.emit('sendClickPos', {
      posx: posX,
      posy: posY
    });

    this.socket.on('returnClickPos', (data) => {
      console.log('returnClickPos', data);
      callback(data);
    });

  }

  // getTouchOrNot() {
   
  // }

  connectToSo(username: string) {
    this.socket.emit('joinparty', username);

    this.socket.on('waiting-adverser', (data) => {
      // sessionStorage.setItem('gameoff', data.wait);
    });

    this.socket.on('newparty', (data) => {
      sessionStorage.setItem('gameon', data.start);
      
      if (sessionStorage.currentUsername === data.users[0]) {
        sessionStorage.setItem('adverser', data.users[1]);
      } else {
        sessionStorage.setItem('adverser', data.users[0]);
      }
      // console.log('sessionStorage after adverser came', sessionStorage);
    });
  }


  disconnectToSo() {
    this.socket.emit('leave');
    this.socket.emit('disconnect');
  }

}