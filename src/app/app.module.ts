import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpModule } from '@angular/http';
import { ImageCropperComponent } from 'ng2-img-cropper';

import { JoinPipe } from './pipes/join.pipe';
import { DatePipe } from './pipes/date.pipe';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SpecificEventComponent } from './specific-event/specific-event.component';
import { FooterComponent } from './footer/footer.component';
import { AllEventsComponentComponent } from './all-events-component/all-events-component.component';
import { AddEventPageComponent } from './add-event-page/add-event-page.component';
import { AddLectionPageComponent } from './add-lection-page/add-lection-page.component';
import { AppRoutingModule } from './app-routing-module';
import { ConfService } from './conf-service';
import { AddEventComponent } from './add-event/add-event.component';
import { ModalLocationComponent } from './modal-location/modal-location.component';
import { CropperComponent } from './cropper-event/cropper.component';
import { AddAgendaComponent } from './add-agenda/add-agenda.component';
import { ModalSpeakerComponent } from './modal-speaker/modal-speaker.component';
import { SpeakerPageComponent } from './speaker-page/speaker-page.component';
import { CropperLocationComponent } from './cropper-location/cropper-location.component';
import { ModalViewSpeakerComponent } from './modal-view-speaker/modal-view-speaker.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyAu11pUskqMZVhgif2mKIXKUns3GYp7iyI',
  authDomain: 'project-ui.firebaseapp.com',
  databaseURL: 'https://project-ui.firebaseio.com',
  projectId: 'project-ui',
  storageBucket: 'project-ui.appspot.com',
  messagingSenderId: '765785209174'
};

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SpecificEventComponent,
    FooterComponent,
    AllEventsComponentComponent,
    AddEventPageComponent,
    AddLectionPageComponent,
    AddEventComponent,
    ModalLocationComponent,
    CropperComponent,
    ImageCropperComponent,
    AddAgendaComponent,
    ModalSpeakerComponent,
    SpeakerPageComponent,
    CropperLocationComponent,
    JoinPipe,
    DatePipe,
    ModalViewSpeakerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2AutoCompleteModule,
    NgbModule.forRoot()
  ],
  providers: [ConfService],
  bootstrap: [AppComponent]
})
export class AppModule { }
