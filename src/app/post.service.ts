import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SiteVisionResponse } from './SiteVisionResponse';
import { Post2 } from './post2';

  
@Injectable({
  providedIn: 'root'
})

export class PostService {
  private url = 'http://localhost:4200/admin/messages';

   
  constructor(private httpClient: HttpClient) { }
  
  getPosts(link: string){
    return this.httpClient.get<SiteVisionResponse>(link);
  }

  create(post: Post2) {
    return this.httpClient.post(this.url, JSON.stringify(post));
  }
  
}
