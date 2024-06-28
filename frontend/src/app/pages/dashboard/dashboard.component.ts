import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IContent } from 'src/app/core/model/content.model';
import { ContentService } from 'src/app/core/service/content.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  contents: IContent[] = [];
  sanitizedUrls: SafeUrl[] = [];

  constructor(private http:HttpClient, private contentService: ContentService , private sanitizer: DomSanitizer,){}

  ngOnInit(): void {
  }



}
