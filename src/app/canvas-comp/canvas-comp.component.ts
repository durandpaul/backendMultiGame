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
  private context: CanvasRenderingContext2D;
  // canvas;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {

    this.draw();
  }


  private draw() {
    this.canvas = this.renderer.selectRootElement('.canvasGrid');
    this.context = this.canvas.getContext('2d');

    this.context.fillStyle = 'rgb(200, 0, 0)';
    this.context.fillRect(10, 10, 50, 50);

    this.context.fillStyle = 'rgba(0, 0, 200, 0.5)';
    this.context.fillRect(30, 30, 50, 50);
  }
}
