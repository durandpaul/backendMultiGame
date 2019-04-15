import {
  Component, ViewChild, Renderer2, OnInit, Output, Input, EventEmitter, DoCheck
} from '@angular/core';

import { DatagameService } from '../datagame.service';
import { SocketService } from '../socket.service';


@Component({
  selector: 'app-canvas-comp',
  templateUrl: './canvas-comp.component.html',
  styleUrls: ['./canvas-comp.component.css']
})
export class CanvasCompComponent implements OnInit, DoCheck {
  @ViewChild('canvasgrid') canvas: any;
  @ViewChild('canvasredcross') canvasSec: any;

  private context: CanvasRenderingContext2D;
  private context2: CanvasRenderingContext2D;

  increCol: number;
  increRow: number;
  show: boolean = true;
  notConnect: boolean = false;
  gameOn: boolean;
  lastCross = {
    newX: [],
    newY: [],
    colors: []
  }


  @Input() decoInput: boolean;
  @Output() start: EventEmitter<boolean> = new EventEmitter();
  @Output() notStart: EventEmitter<boolean> = new EventEmitter();


  img: any;

  constructor(private renderer: Renderer2, private renderer2: Renderer2, private dataGameS: DatagameService, private socketS: SocketService) {
  }

  ngOnInit() {
    sessionStorage.clear();
    if (sessionStorage.length === 0) {
      this.decoInput = true;
      this.canvas = this.renderer.selectRootElement('.canvasgrid');
      this.context = this.canvas.getContext('2d');
    }
  }

  ngDoCheck() {
    if (sessionStorage.adverser != undefined) {
      this.gameOn = true;
      this.start.emit(this.gameOn);
      this.notStart.emit(!this.gameOn);
      // if(sessionStorage.gameon) {
      //   this.drawWinOrLoose();
  
      // }
    }
  }

  gameAccess() {
    if (sessionStorage.length === 2) {
      this.decoInput = false;
      // Remettre afin que le canvas ne se lance que lorsque l'on clique sur le bouton start !
      this.drawGrid();
      this.drawSpaceFleet();
      this.socketS.connectToSo(sessionStorage.currentUsername);
    } else {
      this.notConnect = true;
    }
  }

  clickFleet(event) {
    if (sessionStorage.gameon !== undefined) {

      var clickX = event.clientX - 330;
      var clickY = event.clientY - 60;
      this.socketS.sendClickPos(clickX, clickY, (data: any) => {
        if (data) {
          this.drawCross(data.bool, data.posxy.x, data.posxy.y, data.userT);
        }
      });
    } 
  }

  private drawCross(toucheOrN, x: number, y: number, userT: string) {

    this.calculToDrawCross(x, y, (newX: number, newY: number) => {
      this.canvas = this.renderer.selectRootElement('.canvasgrid');
      this.context = this.canvas.getContext('2d');
      var color = '';
      this.lastCross.newX.push(newX);
      this.lastCross.newY.push(newY);

      if (toucheOrN === true && userT === sessionStorage.currentUsername) {
        let blue = 'blue';
        this.context.beginPath();
        this.context.moveTo(newX + 2, newY + 2);
        this.context.lineTo(newX + 73, newY + 73);
        this.context.moveTo(newX + 73, newY + 2);
        this.context.lineTo(newX + 2, newY + 73);
        this.context.strokeStyle = blue;
        this.context.stroke();
        this.lastCross.colors.push(color);
      }

      if (toucheOrN === undefined) {
        let red = 'red';
        this.context.beginPath();
        this.context.moveTo(newX + 2, newY + 2);
        this.context.lineTo(newX + 73, newY + 73);
        this.context.moveTo(newX + 73, newY + 2);
        this.context.lineTo(newX + 2, newY + 73);
        this.context.strokeStyle = red;
        this.context.stroke();
        this.lastCross.colors.push(color);
      }

      if (toucheOrN === true && userT === sessionStorage.adverser) {
        let green = 'green';
        this.context.beginPath();
        this.context.moveTo(newX + 2, newY + 2);
        this.context.lineTo(newX + 73, newY + 73);
        this.context.moveTo(newX + 73, newY + 2);
        this.context.lineTo(newX + 2, newY + 73);
        this.context.strokeStyle = green;
        this.context.stroke();
        this.lastCross.colors.push(color);
      }
   

    });

  }

  drawWinOrLoose() {
    this.context.font = '48px serif';
    this.context.strokeStyle = 'red';
    this.context.strokeText('You WIN', 325,300);
  }

  private calculToDrawCross(x: number, y: number, callback) {
    let calcX = Math.floor(x / 75);
    let calcY = Math.floor(y / 75);
    let newX: number;
    let newY: number;

    // console.log('calculToDrawCross');

    if (calcX === 0) {
      console.log('calcX === 0');

      newX = 0;
    }
    else if (calcX > 0) {
      console.log('calcX > 0');
      newX = 75 * calcX;
    }

    if (calcY === 0) {
      console.log('calcY === 0');
      newY = 0;
    }
    else if (calcY > 0) {
      console.log('calcY > 0');
      newY = 75 * calcY;
    }

    callback(newX, newY);
  }


  private drawGrid() {
    const gameBoxHeight = this.canvas.height;
    const gameBoxWidth = this.canvas.width;
    const gridNumberHeightL = gameBoxHeight / 100;
    const gridNumberWidthL = gameBoxWidth / 75;
    this.context.clearRect(0, 0, gameBoxWidth, gameBoxHeight);
    this.increCol = 0;

    for (let x = 0; x < gridNumberWidthL; x++) {
      this.increRow = 0;

      for (let y = 0; y < gridNumberHeightL + 2; y++) {

        this.context.strokeStyle = '#DCDCDC';
        // this.context.shadowBlur = 0.1;
        this.context.strokeRect(this.increCol, this.increRow, 75, 75);
        this.increRow += 75;

      }

      this.increCol += 75;
    }
  }

  private drawSpaceFleet() {
    const gameBoxHeight = this.canvas.height;
    let xCanvasOccup = 1;
    this.dataGameS.getFleetToDraw().subscribe((data) => {
      const fleet = data.fleet[0];

      this.img = new Image();
      this.img.onload = () => {
        let increColPlus = 0;
        let heigthInCanvas = 0;
        let lastBattleShip = {
          canvasXpos: [],
          canvasYpos: [],
          height: [],
          numbSquare: []
        }
        for (let i = 0; i < 5; i++) {
          this.increCol = this.randomShipPosX();
          this.increRow = this.randomShipPosY();
          heigthInCanvas = this.increRow + 75 * fleet.ycanvasoccup[i];

          if (i === 3 || i === 4) {
            xCanvasOccup = 2.2;
            increColPlus = 20;
          }

          for (let j = 0; j < lastBattleShip.canvasXpos.length; j++) {

            if (this.increCol === lastBattleShip.canvasXpos[j]) {

              if (this.increRow === lastBattleShip.canvasYpos[j] || heigthInCanvas - lastBattleShip.height[j] < 0 || lastBattleShip.height[j] - heigthInCanvas < lastBattleShip.height[j]) {
                this.increCol = this.randomShipPosX();
                this.increRow = this.randomShipPosY();

              }

            }

          }

          if (heigthInCanvas > gameBoxHeight) {
            //Récupère la taille du vaisseau qui est en dehors du canvas pour le réajuster dans le canvas.
            let OutCanvasGrid = (this.increRow + 75 * fleet.ycanvasoccup[i]) - gameBoxHeight;

            lastBattleShip.canvasXpos.push(this.increCol);
            lastBattleShip.canvasYpos.push(this.increRow);
            lastBattleShip.height.push(this.increRow - OutCanvasGrid);
            lastBattleShip.numbSquare.push(fleet.ycanvasoccup[i]);

            this.increCol += increColPlus;
            this.context.drawImage(this.img, fleet.x[i], fleet.y[i], fleet.width[i], fleet.height[i],
              this.increCol, this.increRow - OutCanvasGrid, 75 / xCanvasOccup, 75 * fleet.ycanvasoccup[i]);
          } else {

            lastBattleShip.canvasXpos.push(this.increCol);
            lastBattleShip.canvasYpos.push(this.increRow);
            lastBattleShip.height.push(heigthInCanvas);
            lastBattleShip.numbSquare.push(fleet.ycanvasoccup[i]);

            this.increCol += increColPlus;
            this.context.drawImage(this.img, fleet.x[i], fleet.y[i], fleet.width[i], fleet.height[i],
              this.increCol, this.increRow, 75 / xCanvasOccup, 75 * fleet.ycanvasoccup[i]);

          }
        }

        this.socketS.sendRandomFleet(lastBattleShip);
      }
      this.img.src = './assets/img/spaceshipFleetsf.png';
    },
      (error) => {
        console.error(error);
      }
    );

  }

  getRandomInt(max: number) {
    // utilisé pour affiché ship de horizontale ou verticale
    return Math.floor(Math.random() * Math.floor(max));
  }

  randomShipPosX() {
    let randomNumber = Math.floor(Math.random() * 10) * 75;
    return randomNumber;
  }

  randomShipPosY() {
    let randomNumber = Math.floor(Math.random() * 8) * 75;
    return randomNumber;
  }

}
