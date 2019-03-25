import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { CanvasCompComponent } from './canvas-comp/canvas-comp.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './user/user.component';
import { SocketComponent } from './socket/socket.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserBoardComponent } from './user-board/user-board.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasCompComponent,
    FooterComponent,
    UserComponent,
    SocketComponent,
    UserBoardComponent
  ],
  imports: [
    NgbModule, BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
