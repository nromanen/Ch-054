export class EventLocation {
    id: string;
    address: string;
    city: string;
    country: string;
    photos: Array<String[]>;

    constructor(address, city, country, photos) {
        this.address = address;
        this.city = city;
        this.country = country;
        this.photos = photos;
    }
}

