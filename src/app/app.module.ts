import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { TutorialService } from '../services/tutorial-service'
import { MatStepperModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatCardModule, MatGridListModule, MatIconModule, MatSnackBarModule, MatListModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ResourceComponent } from '../app/resource/resource.component';
import { VideoComponent } from './video/video.component';
import { AudioComponent } from './audio/audio.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../services/user-service';
import { TutorialCreateComponent } from './tutorial-create/tutorial-create.component';
import { TutorialStepCreateComponent } from './tutorial-step-create/tutorial-step-create.component';
import { TutorialChildStepCreateComponent } from './tutorial-child-step-create/tutorial-child-step-create.component';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { PreviewComponent } from './preview/preview.component';
import { MenuComponent } from './menu/menu.component';
import { UserInfoComponent } from './user-info/user-info.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'tutorial', component: TutorialComponent },
  { path: 'tutorial-step-create', component: TutorialStepCreateComponent },
  { path: 'tutorial-create', component: TutorialCreateComponent },
  { path: 'main/:user', component: MenuComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    TutorialComponent,
    ResourceComponent,
    VideoComponent,
    AudioComponent,
    LoginComponent,
    TutorialCreateComponent,
    TutorialStepCreateComponent,
    TutorialChildStepCreateComponent,
    FormUploadComponent,
    PreviewComponent,
    MenuComponent,
    UserInfoComponent

  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
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
    MatListModule,
    VgCoreModule,
    VgControlsModule,
    HttpModule,
    HttpClientModule,
    MatMenuModule,
    MatToolbarModule
  ],
  providers: [TutorialService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
