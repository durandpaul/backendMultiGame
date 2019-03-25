import {
  Component, AfterViewInit, ViewChild, ElementRef, Renderer2, OnInit
} from '@angular/core';

@Component({
  selector: 'app-canvas-comp',
  templateUrl: './canvas-comp.component.html',
  styleUrls: ['./canvas-comp.component.css']
})
export class CanvasCompComponent implements OnInit {
  @ViewChild('canvasGrid') canvas;
  @ViewChild('canvasFleet') canvasSec;
  private context: CanvasRenderingContext2D;
  increCol: number;
  increRow: number;

  img;
  ship = {
    x: [54, 197, 314, 419, 419],
    y: [305, 348, 426, 515, 515],
    width: [125, 99, 86, 33, 33],
    height: [295, 248, 173, 92, 92],
    yCanvasOccup: [4, 3, 2, 1, 1],
  };

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.drawGrid();
    this.drawSpaceFleet();
  }


  private drawGrid() {

    this.canvas = this.renderer.selectRootElement('.canvasGrid');
    this.context = this.canvas.getContext('2d');
    const gameBoxHeight = this.canvas.height;
    const gameBoxWidth = this.canvas.width;
    const gridNumberHeightL = gameBoxHeight / 100;
    const gridNumberWidthL = gameBoxWidth / 100;

    this.increCol = 0;
    for (let x = 0; x < gridNumberWidthL; x++) {
      this.increRow = 0;
      // console.log('x = ', x);
      for (let y = 0; y < gridNumberHeightL + 2; y++) {
        // console.log('y = ', y);
        this.context.strokeStyle = '#DCDCDC';
        // this.context.shadowBlur = 0.1;
        this.context.strokeRect(this.increCol, this.increRow, 75, 75);
        this.increRow += 75;
        // console.log('this.increRow', this.increRow);
      }
      // console.log('this.increCol', this.increCol);
      this.increCol += 75;
    }
  }

  private drawSpaceFleet() {
    this.canvasSec = this.renderer.selectRootElement('.canvasFleet');
    this.context = this.canvas.getContext('2d');
    const gameBoxHeight = this.canvas.height;
    const gameBoxWidth = this.canvas.width;
    let xCanvasOccup = 1;
    this.img = new Image();

    this.img.onload = () => {
      let increColPlus = 0;
      for (let i = 0; i < 5; i++) {
        this.increCol = this.randomShipPosX();
        this.increRow = this.randomShipPosY();
        const lastRandom = this.increRow;
        console.log('lastRandom', lastRandom);
        console.log('this.increRow', this.increRow);
        if (lastRandom === this.increRow) {
          this.increRow = this.randomShipPosY();
          console.log('ok');
        }

        if (i === 3 || i === 4) {
          xCanvasOccup = 2.2;
          increColPlus = 20;
        }

        if (this.increRow + 75 * this.ship.yCanvasOccup[i] > gameBoxHeight) {
          let OutCanvasGrid = (this.increRow + 75 * this.ship.yCanvasOccup[i]) - gameBoxHeight;

          this.context.drawImage(this.img, this.ship.x[i], this.ship.y[i], this.ship.width[i], this.ship.height[i],
            this.increCol + increColPlus, this.increRow - OutCanvasGrid, 75 / xCanvasOccup, 75 * this.ship.yCanvasOccup[i]);
        } else {
          this.context.drawImage(this.img, this.ship.x[i], this.ship.y[i], this.ship.width[i], this.ship.height[i],
            this.increCol + increColPlus, this.increRow, 75 / xCanvasOccup, 75 * this.ship.yCanvasOccup[i]);
        }
      }
    };
    function getRandomInt(max) {
      // utilisé pour affiché ship de horizontale ou verticale
      return Math.floor(Math.random() * Math.floor(max));
    }
    console.log(getRandomInt(4));
    this.img.src = './assets/img/spaceshipFleet.jpg';
  }

  randomShipPosX() {
    let randomNumber = Math.floor(Math.random() * 10) * 75;
    return randomNumber;
    // min = Math.ceil(min);
    // max = Math.floor(max);
    // console.log(Math.floor(Math.random() * (max - min)) + min);
    // return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive

  }

  randomShipPosY() {
    let randomNumber = Math.floor(Math.random() * 8) * 75;
    return randomNumber;
    // min = Math.ceil(min);
    // max = Math.floor(max);
    // console.log(Math.floor(Math.random() * (max - min)) + min);
    // return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
  }
}
