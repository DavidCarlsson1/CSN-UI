import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SiteVisionResponse } from './SiteVisionResponse';
import { Post3 } from './post3';

  
@Injectable({
  providedIn: 'root'
})

export class PostService {
  private url: string = 'http://localhost:4200/admin/messages';

  constructor(private httpClient: HttpClient) { }
  
  getPosts(link: string) {
    return this.httpClient.get<SiteVisionResponse>(link);
  }

  create(post: Post3) {
    alert("hej");
    alert(post);
    this.httpClient.post<Post3>(this.url, post)
        .subscribe(response => {
        });
    alert("hej2");
  }
  
}
