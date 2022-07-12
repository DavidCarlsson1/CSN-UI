import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { Post3 } from './post3';
import { SiteVisionResponse } from './SiteVisionResponse';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  posts: any;
  title: any;
  formdata: any;
  fControl: FormControl;
  post3 : Post3 = {
    headline: '',
    text: '',
    hyperlink: '',
    author: '',
    startDate: '',
    endDate: ''
  };

  constructor(private _http: HttpClient, private service: PostService) { }

  public siteVisionResponse: SiteVisionResponse;
  

  ngOnInit() {
    this.service.getPosts("http://localhost:4200/public/messages")        /*Skriv om startfunktionen senare*/
      .subscribe(response => {
        this.posts = response;
      });
  }

  createPost(data: {url: string; startDate: string; endDate: string;}) {

    this._http.get<SiteVisionResponse>(data.url)
      .subscribe({
        next: (data: SiteVisionResponse) => {
          this.siteVisionResponse = data;
        },
      });
    
      alert("1");

    const nodeList = this.siteVisionResponse.contentNodes;

    this.post3.headline = nodeList[0]?.properties.textContent;
    this.post3.text = nodeList[1]?.properties.textContent;
    this.post3.startDate = data.startDate;
    this.post3.endDate = data.endDate;
    this.post3.hyperlink = "https://www.csn.se/";
    this.post3.author = "CSN";

    alert("2");

    var innerHTML = ('<p>' + "headline: " + this.post3.headline + '<br>' + "text: " + this.post3.text + '<br>' + "startDate: " + this.post3.startDate + '<br>' + "endDate: " + this.post3.endDate + '</p>');
    document.getElementById("appendDiv")?.append(innerHTML);
    
    this.service.create(this.post3);
  }
}

