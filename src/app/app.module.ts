import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';
import { EditorModule } from 'primeng/primeng';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpModule } from '@angular/http';
import { ImageCropperComponent } from 'ng2-img-cropper';
import { JoinPipe } from './pipes/join.pipe';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SpecificEventComponent } from './specific-event/specific-event.component';
import { FooterComponent } from './footer/footer.component';
import { AllEventsComponentComponent } from './all-events-component/all-events-component.component';
import { AppRoutingModule } from './app-routing-module';
import { AddEventComponent } from './add-event/add-event.component';
import { ModalLocationComponent } from './modal-location/modal-location.component';
import { CropperComponent } from './cropper-event/cropper.component';
import { AddAgendaComponent } from './add-agenda/add-agenda.component';
import { ModalSpeakerComponent } from './modal-speaker/modal-speaker.component';
import { CropperLocationComponent } from './cropper-location/cropper-location.component';
import { ModalViewSpeakerComponent } from './modal-view-speaker/modal-view-speaker.component';
import { LocationService } from './services/location/location.service';
import { SpeakerService } from './services/speaker/speaker.service';
import { AgendaService } from './services/agenda/agenda.service';
import { EventService } from './services/event/event.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SpecificEventComponent,
    FooterComponent,
    AllEventsComponentComponent,
    AddEventComponent,
    ModalLocationComponent,
    CropperComponent,
    ImageCropperComponent,
    AddAgendaComponent,
    ModalSpeakerComponent,
    CropperLocationComponent,
    JoinPipe,
    ModalViewSpeakerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    Ng2AutoCompleteModule,
    NgbModule.forRoot()
  ],
  providers: [
    LocationService,
    SpeakerService,
    AgendaService,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
