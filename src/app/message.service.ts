import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
  
@Injectable({
  providedIn: 'root'
})

export class MessageService {
  private url = 'http://localhost:4200/public/messages';
   
  constructor(private httpClient: HttpClient) { }
  
  getMessages(){
    return this.httpClient.get(this.url);
  }
  
}