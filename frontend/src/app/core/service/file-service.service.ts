import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {
  private files: { name: string, mimetype: string }[] = [
    { name: 'Video 1', mimetype: 'video/mp4' },
    { name: 'Video 1', mimetype: 'video/mp4' },
    { name: 'Video 1', mimetype: 'video/mp4' },
    { name: 'Audio 1', mimetype: 'audio/mp3' },
    { name: 'Image 1', mimetype: 'image/jpeg' },
    { name: 'Image 1', mimetype: 'image/jpeg' },
    { name: 'Image 1', mimetype: 'image/jpeg' },
    { name: 'Image 1', mimetype: 'image/jpeg' },
    { name: 'PDF 1', mimetype: 'application/pdf' },
  ];

  getFilesByType(mimetype: string): { name: string, mimetype: string }[] {
    return this.files.filter(file => file.mimetype === mimetype);
  }

}
