import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ContentService } from 'src/app/core/service/content.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.scss']
})
export class CreateContentComponent {

  contentForm: FormGroup;

  constructor(private fb: FormBuilder, private contentService:ContentService, private router:Router) {
    this.contentForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      uploadedBy: [localStorage.getItem('userId'), Validators.required],
      file: [null, Validators.required]  // Initialize as null; set required validation
    });
  }

  ngOnInit(): void {
    const uploadedBy = localStorage.getItem('userId');
    if (uploadedBy) {
      this.contentForm.patchValue({uploadedBy});
    }
  }

  onSubmit() :void{
    if (this.contentForm.valid) {
      const formData = new FormData();
      formData.append('title', this.contentForm.get('title')?.value);
      formData.append('body', this.contentForm.get('body')?.value);
      formData.append('uploadedBy', this.contentForm.get('uploadedBy')?.value);
      formData.append('file', this.contentForm.get('file')?.value);

      console.log(formData,"form  data");
      
      this.contentService.createContent(formData).subscribe(
        response => {
          console.log("created");
          this.router.navigate(['/dashboard'])
        },
        error => {
          console.error("error in creating content")
        }
      )
    } else {
      console.log("error");
      
    }
  }

  onFileSelected(event:any):void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.contentForm.patchValue({
        file: file 
      });
    }
  }
}
