export class Event{
    id: number;
    description: string;
    dateFrom: Date;
    dateTo: Date;
    name: string;
    location: Location;
    eventPhotos: string;

    constructor(name, description, dateFrom, location, dateTo, eventPhotos) {
        this.name = name;
        this.description = description;
        this.dateFrom = dateFrom;
        this.location = location;
        this.dateTo = dateTo;
        this.eventPhotos = eventPhotos;
    }
}
