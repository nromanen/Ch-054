import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SpecificEventComponent } from './specific-event/specific-event.component';
import { FooterComponent } from './footer/footer.component';
import { AllEventsComponentComponent } from './all-events-component/all-events-component.component';
import { AddEventPageComponent } from './add-event-page/add-event-page.component';
import { AddLectionPageComponent } from './add-lection-page/add-lection-page.component';
import { AppRoutingModule } from './app-routing-module';

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
    AddLectionPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
