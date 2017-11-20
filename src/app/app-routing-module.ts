import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventPageComponent } from './add-event-page/add-event-page.component';
import { AllEventsComponentComponent } from './all-events-component/all-events-component.component';
import { AddLectionPageComponent } from './add-lection-page/add-lection-page.component';
import { SpecificEventComponent } from './specific-event/specific-event.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddAgendaComponent } from './add-agenda/add-agenda.component';

const routes: Routes = [
    {path: '', redirectTo: 'all-event', pathMatch: 'full'},
    {path: 'add-lection-page', component: AddLectionPageComponent},
    {path: 'event/:id', component: SpecificEventComponent },
    {path: 'all-event', component: AllEventsComponentComponent},
    { path: 'add-event-page', component: AddEventPageComponent },
    { path: 'add/event', component: AddEventComponent },
    {path: 'add/agenda', component: AddAgendaComponent}
];

  @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
    })
    export class AppRoutingModule {
    }
