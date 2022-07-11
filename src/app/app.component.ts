import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { Post3 } from './post3';
import { SiteVisionResponse } from './SiteVisionResponse';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  posts: any;
  title: any;
  formdata: any;
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

  createPost(data: { url: string; startDate: string; endDate: string; }) {

    this._http.get<SiteVisionResponse>(data.url)
      .subscribe({
        next: (data: SiteVisionResponse) => {
          this.siteVisionResponse = data;
        },
      });

    /*var nodeList = Array.prototype.slice.call(this.siteVisionResponse?.contentNodes);*/
    const nodeList = this.siteVisionResponse.contentNodes;

    alert("0");
    alert(nodeList[0].properties.textContent);

    this.post3.headline = nodeList[0]?.properties.textContent;
    alert("1");
    this.post3.text = nodeList[1]?.properties.textContent;
    alert("2");
    this.post3.startDate = data.startDate;
    alert("3");
    this.post3.endDate = data.endDate;
    alert("4");

    var innerHTML = ('<p>' + "headline: " + this.post3.headline + '<br>' + "text: " + this.post3.text + '<br>' + "startDate: " + this.post3.startDate + '<br>' + "endDate: " + this.post3.endDate + '</p>');
    document.getElementById("appendDiv")?.append(innerHTML);

    alert("5");
    
    this.service.create(this.post3)
      .subscribe(response => {
        this.posts = response;
      });

    alert("6");
  }
}

