import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EsNg2ValidatorModule } from 'es-ng2-validator' ;

import { AppComponent } from './app.component';

import { DemoService } from './services/demo.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    EsNg2ValidatorModule
  ],
  providers: [DemoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
