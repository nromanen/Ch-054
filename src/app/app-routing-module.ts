import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLinkActive } from '@angular/router';
import { AllEventsComponentComponent } from './all-events-component/all-events-component.component';
import { SpecificEventComponent } from './specific-event/specific-event.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AddAgendaComponent } from './add-agenda/add-agenda.component';
import { SpeakerComponent } from './speaker/speaker.component';
import {OpenEventsComponent} from './open-events/open-events.component'

const routes: Routes = [
    { path: '', redirectTo: 'all-event', pathMatch: 'full' },
    { path: 'event/:id', component: SpecificEventComponent },
    { path: 'speaker/:id', component: SpeakerComponent },
    { path: 'all-event', component: AllEventsComponentComponent },
    { path: 'open/events', component: OpenEventsComponent },
    { path: 'add/event', component: AddEventComponent },
    { path: 'add/agenda', component: AddAgendaComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
