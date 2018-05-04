import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import {TutorialService} from '../services/tutorial-service'
import {MatStepperModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatCardModule, MatGridListModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import {HttpModule} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {ResourceComponent} from '../app/resource/resource.component';
import { VideoComponent } from './video/video.component';
import { AudioComponent } from './audio/audio.component';



@NgModule({
  declarations: [
    AppComponent,
    TutorialComponent,
    ResourceComponent,
    VideoComponent,
    AudioComponent

 ],
  imports: [
    BrowserModule,
    MatStepperModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatSnackBarModule,
    VgCoreModule,
    VgControlsModule,
    HttpModule,
    HttpClientModule   
    
  ],
  providers: [TutorialService],
  bootstrap: [AppComponent]
})
export class AppModule { }
