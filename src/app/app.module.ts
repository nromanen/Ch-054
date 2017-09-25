import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SpecificEventComponent } from './specific-event/specific-event.component';
import { FooterComponent } from './footer/footer.component';
import { AllEventsComponentComponent } from './all-events-component/all-events-component.component';
import { AddEventPageComponent } from './add-event-page/add-event-page.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SpecificEventComponent,
    FooterComponent,
    AllEventsComponentComponent,
    AddEventPageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
