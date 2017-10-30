export class Speaker {
    id: number;
    fullName: string;
    description: string;
    placeWork: string;
    position: string; 
    photoPath: string;
    // reports: Array<Report> = [];
    constructor(fullName, description, placeWork, position, photoPath) {
        this.fullName = fullName;
        this.description = description;
        this.placeWork = placeWork;
        this.position = position;
        this.photoPath = photoPath;
    }
}
