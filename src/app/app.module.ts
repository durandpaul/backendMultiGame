import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CanvasCompComponent } from './canvas-comp/canvas-comp.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { UserServicesComponent } from './user-services/user-services.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasCompComponent,
    FooterComponent,
    UserServicesComponent
  ],
  imports: [
    NgbModule, BrowserModule, AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
