"use client"

import L from "leaflet"
import { MapContainer,Marker,TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src
})

interface MapProps {
    center?: number[],
    cityZoom: boolean,
    stateZoom: boolean
}

const Map:React.FC<MapProps> = ({center,cityZoom,stateZoom}) => {
  return (
    <MapContainer
    center={center as L.LatLngExpression || [50,-10]}
    zoom={center ? (cityZoom ?  9 : (stateZoom ? 6 : 4) ) : 2}
    scrollWheelZoom={false}
    className="h-[35vh] rounded-lg"
    >
        <TileLayer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {center && (
            <Marker 
            position={center as L.LatLngExpression}
            />
        )}
    </MapContainer>
  )
}

export default Map