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
    const isCargo = entity instanceof Cargo;
    const icon = Leaflet.icon({
      iconUrl: isCargo
        ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png"
        : "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    Leaflet.marker([entity.location.lat, entity.location.lon], { icon: icon })
      .addTo(this.leafLetMap)
      .bindPopup(
        `${isCargo ? "Cargo" : "Destination"}: ${
          isCargo ? entity.trackingId : entity.receiver
        }`
      )
      .openPopup();
  }
}
