import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SpecificEventComponent } from './specific-event/specific-event.component';
import { FooterComponent } from './footer/footer.component';
import { AllEventsComponentComponent } from './all-events-component/all-events-component.component';
import { AddEventPageComponent } from './add-event-page/add-event-page.component';
import { AddLectionPageComponent } from './add-lection-page/add-lection-page.component';
import { AppRoutingModule } from './app-routing-module';


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
    NgbModule.forRoot()
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
