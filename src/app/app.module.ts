import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { InstructionComponent } from './instruction/instruction.component';
import { InstructionService } from '../services/instruction-service'
import { MatStepperModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatCardModule, MatGridListModule, MatIconModule, MatSnackBarModule, MatListModule, MatMenuModule, MatToolbarModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ResourceComponent } from '../app/resource/resource.component';
import { VideoComponent } from './video/video.component';
import { AudioComponent } from './audio/audio.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../services/user-service';
import { InstructionCreateComponent } from './instruction-create/instruction-create.component';
import { InstructionStepCreateComponent } from './instruction-step-create/instruction-step-create.component';
import { InstructionChildStepCreateComponent } from './instruction-child-step-create/instruction-child-step-create.component';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { PreviewComponent } from './preview/preview.component';
import { MenuComponent } from './menu/menu.component';
import { UserInfoComponent } from './user-info/user-info.component';
import {MatTooltipModule} from '@angular/material/tooltip';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'instruction', component: InstructionComponent },
  { path: 'instruction-step-create', component: InstructionStepCreateComponent },
  { path: 'instruction-create', component: InstructionCreateComponent },
  { path: 'main/:user', component: MenuComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    InstructionComponent,
    ResourceComponent,
    VideoComponent,
    AudioComponent,
    LoginComponent,
    InstructionCreateComponent,
    InstructionStepCreateComponent,
    InstructionChildStepCreateComponent,
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
    MatToolbarModule,
    MatTooltipModule,
    MatSelectModule
  ],
  providers: [InstructionService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
