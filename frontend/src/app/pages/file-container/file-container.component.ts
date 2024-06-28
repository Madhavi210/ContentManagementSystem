import { ParseFlags } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContentService } from 'src/app/core/service/content.service';
import { FileServiceService } from 'src/app/core/service/file-service.service';
import Swal from 'sweetalert2';
import { IContent } from 'src/app/core/model/content.model';
@Component({
  selector: 'app-file-container',
  templateUrl: './file-container.component.html',
  styleUrls: ['./file-container.component.scss']
})
export class FileContainerComponent implements OnInit {

  pdfFiles: any[] = [];
  imageFiles: any[] = [];
  videoAudioFiles: any[] = [];
  userId:string | null = null; 
  userRole: string | null = '';
  totalContent: number = 0;

  constructor(private contentService: ContentService, private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.fetchContent();
    this.userId = localStorage.getItem("userId"); 
    this.userRole = localStorage.getItem('role');
  }

  fetchContent():void {
    this.contentService.getContent().subscribe(
      data => {
        if (Array.isArray(data.content)) {
          this.pdfFiles = data.content.filter(item => item.media?.mimetype === 'application/pdf');
          this.imageFiles = data.content.filter(item => item.media?.mimetype.startsWith('image/'));
          this.videoAudioFiles = data.content.filter(item => item.media?.mimetype.startsWith('audio/') || item.media?.mimetype.startsWith('video/'));
        } else{
          console.error('Invalid data structure returned from server:', data.content);
        }
      },
      error => {
        console.error("Error fetching content:", error);
      }
    );
  }

  isImage(mimetype: string): boolean {
    return (mimetype.startsWith('image') );
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

  getMediaUrl(relativePath: string): SafeResourceUrl {
    const fullUrl = `http://localhost:3000/uploads/${relativePath}`; // Adjust URL as per your backend setup
    console.log(fullUrl,"fullurl");
    return this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
  }

  downloadFile(relativePath: string, filename: string): void {
    const fullUrl = `http://localhost:3000/uploads/${filename}`; // Adjust URL as per your backend setup
    const anchor = document.createElement('a');
    anchor.href = fullUrl;
    anchor.download = filename;
    anchor.click();
  }

  onDeleteContent(contentId: string){
    if(this.userRole === 'editor' || this.userRole === 'admin'){
      if(confirm("are you sure to delete this item?")){
        this.contentService.deleteContent(contentId)
        .subscribe(
          () => {
            console.log(`Content with ID ${contentId} deleted successfully.`);
            this.fetchContent(); // Refresh content list after deletion
          },
          error => {
            console.error(`Error deleting content with ID ${contentId}:`, error);
          }
        );
      }
    } else{
      Swal.fire("Warning", "Unauthorized user", "warning")
    }
  }


  likeFile(){
    console.log("like added");
  }

}
