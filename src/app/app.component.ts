import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SiteVisionResponse } from './SiteVisionResponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'prototyp';

  constructor(private _http: HttpClient) {}

  public siteVisionResponse: SiteVisionResponse | undefined;

  public ngOnInit(): void {
    this._http
      .get<SiteVisionResponse>(
        'https://www.int14.csnnet.int/rest-api/1/1/4.23a46dfb173b37383332db4f/headless'
      )
      .subscribe({
        next: (data: SiteVisionResponse) => {
          this.siteVisionResponse = data;
        },
      });
  }
}
