import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { Post2 } from './post2';
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

  constructor(private _http: HttpClient, private service: PostService) { }

  public siteVisionResponse: SiteVisionResponse | undefined;

  ngOnInit() {
    /*this.service.getPosts()        Skriv om startfunktionen senare
      .subscribe(response => {
        this.posts = response;
      });*/
  }

  createPost (input: HTMLInputElement) {

    this._http.get<SiteVisionResponse>(input.getAttribute("link")!)
      .subscribe({
        next: (data: SiteVisionResponse) => {
          this.siteVisionResponse = data;
        },
      });

    var nodeList = Array.prototype.slice.call(this.siteVisionResponse?.contentNodes);

    let post3: Post2 = null!;

    post3.headline = nodeList[1].properties.textContent;
    post3.text = nodeList[2].properties.textContent;
    post3.startDate = input.getAttribute("startDate")!;
    post3.endDate = input.getAttribute("endDate")!;
    
    this.service.create(post3)
      .subscribe(response => {
        this.posts = response;
      });
  }
}