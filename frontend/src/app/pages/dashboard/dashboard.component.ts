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

  // videoUrl: string = 'http://localhost:3000/uploads/file_example_MP4_480_1_5MG.mp4';

  constructor(private http:HttpClient, private contentService: ContentService , private sanitizer: DomSanitizer,){}

  ngOnInit(): void {
    this.fetchContents();
  }

  fetchContents():void{
    this.contentService.getContent().subscribe(
      data => {
        this.contents = data;
        console.log(this.contents[1]);
        this.sanitizeUrls();
      },
      error => {
        console.error("error fetching content", error)
      }
    )
  }

  sanitizeUrls(): void {
    this.contents.forEach(content => {
      if (content.media && content.media.path) {
        const mediaUrl = this.getMediaUrl(content.media.path);
        this.sanitizedUrls.push(mediaUrl);
      }
    });
  }

  getMediaUrl(relativePath: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`http://localhost:3000/${relativePath}`); // Adjust URL as per your backend setup
  }

  onDeleteContent(contentId: string) {
    this.contentService.deleteContent(contentId)
      .subscribe(
        () => {
          console.log(`Content with ID ${contentId} deleted successfully.`);
          this.fetchContents(); // Refresh content list after deletion
        },
        error => {
          console.error(`Error deleting content with ID ${contentId}:`, error);
        }
      );
  }

  isImage(mimetype: string): boolean {
    return (mimetype.startsWith('image') || mimetype === 'image/jpeg');
  }

  isVideo(mimetype: string): boolean {
    return mimetype.startsWith('video');
  }

  isAudio(mimetype: string): boolean {
    return mimetype.startsWith('audio');
  }

  isPdf(mimetype: string): boolean {
    return mimetype === 'application/pdf';
  }

  isText(mimetype: string): boolean {
    return mimetype === 'text/plain';
  }

  isXml(mimetype: string): boolean {
    return mimetype === 'application/xml' || mimetype === 'text/xml';
  }

  downloadFile(relativePath: string, filename: string): void {
    const fullUrl = `http://localhost:3000/${relativePath}`; // Adjust URL as per your backend setup
    const anchor = document.createElement('a');
    anchor.href = fullUrl;
    anchor.download = filename;
    anchor.click();
  }

}
