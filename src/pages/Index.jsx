import { Container, Text, VStack } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom icon for markers
const droneIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const Index = () => {
  const center = [69.9689, 23.2716]; // Center of Alta, Norway
  const markers = [
    { position: [69.9689, 23.2716], image: "/images/drone1.jpg" },
    { position: [69.9699, 23.2716], image: "/images/drone2.jpg" },
    { position: [69.9709, 23.2716], image: "/images/drone3.jpg" },
  ];

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Drone Map of Alta, Norway</Text>
        <MapContainer center={center} zoom={15} style={{ height: "500px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.position} icon={droneIcon}>
              <Popup>
                <img src={marker.image} alt={`Drone view ${index + 1}`} style={{ width: "100%" }} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </VStack>
    </Container>
  );
};

export default Index;