import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImgcarouselComponent } from './imgcarousel/imgcarousel.component';

@NgModule({
  declarations: [
    AppComponent,
    ImgcarouselComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
