export class Event{
    id: number;
    description: string;
    dateFrom: Date;
    dateTo: Date;
    name: string;
    location: Location;
    eventPhotos: string;

    constructor(name, description, dateFrom,  dateTo, eventPhotos, location) {
        this.name = name;
        this.description = description;
        this.dateFrom = dateFrom;
        this.location = location;
        this.dateTo = dateTo;
        this.eventPhotos = eventPhotos;
    }
}
