import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { Post } from './post';
import { SiteVisionResponse } from './SiteVisionResponse';
import { ApiResponse } from './ApiResponse';
import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  posts: any;
  title: any;
  messages: any;
  closeResult: string;
  url: string = "http://localhost:4201/public/messages";
  post : Post = {
    shortId: Number(''),
    headline: '',
    text: '',
    hyperlink: '',
    author: '',
    startDate: '',
    endDate: '',
    publishingDate: ''
  };

  constructor(private _http: HttpClient, private service: PostService, private modalService: NgbModal) { }

  public siteVisionResponse: SiteVisionResponse;
  public apiResponse: ApiResponse | undefined;
  
  ngOnInit() {
    this._http.get<ApiResponse>(this.url)
      .subscribe({
        next: (data: ApiResponse) => {
          this.apiResponse = data;
        }
      });
  }

  createPost(data: {url: string; startDate: string; endDate: string;}) {

    this._http.get<SiteVisionResponse>(data.url)
      .subscribe({
        next: (data1: SiteVisionResponse) => {
          this.siteVisionResponse = data1;

          /*Omvandla publiceringsdatum och tilldela det nya meddelandet*/
          var date: Date = new Date(parseInt(this.siteVisionResponse.properties.publishDate));
          var day = date.getDate();
          if (day < 10) {
            var zero = 0;
            var day2 = ('' + zero + day).toString();
          } else {
            var day2 = day.toString();
          }
          var month = date.getMonth() + 1;
          if (month < 10) {
            var zero = 0;
            var month2 = ('' + zero + month).toString();
          } else {
            var month2 = month.toString();
          }
          var date2 = (date.getFullYear() + '-').toString();
          date2 = date2.concat(month2);
          date2 = date2.concat("-");
          date2 = date2.concat(day2);
          this.post.publishingDate = date2;

          /*Plocka ut data från contentNodes och tilldela*/
          const nodeList = this.siteVisionResponse.contentNodes;
      
          for (let i=0; i<nodeList.length-1; i++) {       
            if (nodeList[i]?.name.toString() == "Rubrik") {
             this.post.headline = nodeList[i]?.properties.textContent;
             break;
            }
          }

          for (let i=0; i<nodeList.length-1; i++) {       
            if (nodeList[i]?.name.toString() == "Innehåll") {
              this.post.text = nodeList[i]?.properties.textContent;
              break;
            }
          }

          /*Se till att texten fortfarande blir styckesindelad*/
          for (let i=1; i<nodeList.length; i++) {
            if (nodeList[i+1]?.name.toString() == "Innehåll") {

              var str1: string = "<br><br>";
              var str2: string = nodeList[i+1]?.properties.textContent;

              this.post.text = this.post.text.concat(str1.toString());
              this.post.text = this.post.text.concat(str2.toString());    
              
            }
          }

          this.post.shortId = this.siteVisionResponse.properties.shortId;
          var str3: string = "https://www.csn.se";
          this.post.hyperlink = str3.concat(this.siteVisionResponse.properties.URI.toString());
          this.post.author = this.siteVisionResponse.properties.publishedBy.properties.displayName;
          this.post.startDate = data.startDate;
          this.post.endDate = data.endDate;
          
          this.service.create(this.post);
          },
      }); 
  }

  removePost(id: number) {
    var link: string;
    link = ('http://localhost:4201/admin/messages/' + id).toString();
    this._http.delete(link)
      .subscribe(data => {
        console.log(data);
      });
    alert("Meddelandet raderades");
    window.location.reload();

  }

  editPost() {

  }

  open(content: any, message: any) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}

