import { Destination } from "./Destination";
import { Cargo } from "./Cargo";
import * as Leaflet from "leaflet";

export class TrackingMap {
  private leafLetMap: Leaflet.Map;

  constructor(elementId: string) {
    this.leafLetMap = Leaflet.map(elementId).setView([0, 20], 1.6);
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(this.leafLetMap);
  }

  attachMarker(entity: Destination | Cargo): void {
    Leaflet.marker([entity.location.lat, entity.location.lon])
      .addTo(this.leafLetMap)
      .bindPopup(
        `${entity instanceof Destination ? "Destination" : "Cargo"}: ${
          entity instanceof Destination ? entity.receiver : entity.trackingId
        }`
      )
      .openPopup();
  }
}
