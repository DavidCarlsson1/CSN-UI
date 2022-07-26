import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { CsnKomponentbibliotekModule, MessageModule } from 'csn-komponentbibliotek';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, CsnKomponentbibliotekModule, MessageModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
