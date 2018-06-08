import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { TutorialService } from '../../services/tutorial-service';
import { Resource } from '../../model/resource';
import { Observable } from 'rxjs';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  resourceId: number;

  constructor(private tutorialService: TutorialService) {
    console.log("form-upload Constructor");

   }

  ngOnInit() {
    console.log("form-upload ngOInit");
  }

  selectFile(event) {
    /*    const file = event.target.files.item(0);
        this.selectedFiles = event.target.files;*/
    this.currentFileUpload = event.target.files.item(0);
    console.log("select file! selected one is: "+this.currentFileUpload.name);
  }

  upload(): Observable<number> {
    this.progress.percentage = 0;

    console.log("upload!")

    var result = this.tutorialService.postResource(this.currentFileUpload);
    this.currentFileUpload = undefined;
    return result;

  /*  var result = this.tutorialService.postResourcePromise(this.currentFileUpload);
    this.currentFileUpload = undefined;
    return result;*/
  }

  setResourceId(id: number) {
    this.resourceId = id;
    console.log(this.resourceId);
  }

}