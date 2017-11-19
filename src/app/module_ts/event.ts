export class Event{
    id: number;
    description: string;
    dateFrom: Date;
    dateTo: Date;
    name: string;
    location: Location;
    eventPhoto: string;

    constructor(name, description, dateFrom,  dateTo, eventPhoto, location) {
        this.name = name;
        this.description = description;
        this.dateFrom = dateFrom;
        this.location = location;
        this.dateTo = dateTo;
        this.eventPhoto = eventPhoto;
    }
}
