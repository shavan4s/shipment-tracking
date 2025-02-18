import { faker } from "@faker-js/faker";

export class Cargo {
    trackingId: string;
    location: {
        lat: number;
        lon: number;
    }
    constructor() {
        this.trackingId = faker.string.uuid();
        this.location = {
            lat: faker.location.latitude(),
            lon: faker.location.longitude(),
        };
    }
}