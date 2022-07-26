import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  messages:any;

  label: string = " HITTA";

  constructor(private service:MessageService) {}

  ngOnInit() {
    this.service.getMessages()
      .subscribe(response => {
        this.messages = response;
      });
  }
}
