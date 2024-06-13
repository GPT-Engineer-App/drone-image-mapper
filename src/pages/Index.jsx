import { useState } from "react";
import { Container, Text, VStack } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Modal from "react-modal";

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
    { position: [69.9689, 23.2716], images: ["/images/drone1.jpg", "/images/drone2.jpg", "/images/drone3.jpg"] },
    { position: [69.9699, 23.2716], images: ["/images/drone1.jpg", "/images/drone2.jpg", "/images/drone3.jpg"] },
    { position: [69.9709, 23.2716], images: ["/images/drone1.jpg", "/images/drone2.jpg", "/images/drone3.jpg"] },
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage("");
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Drone Map of Alta, Norway</Text>
        <MapContainer center={center} zoom={15} style={{ height: "500px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.position} icon={droneIcon}>
              <Popup>
                {marker.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`Drone view ${index + 1} - ${imgIndex + 1}`}
                    style={{ width: "100%", marginBottom: "10px", cursor: "pointer" }}
                    onClick={() => openModal(image)}
                  />
                ))}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </VStack>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Enlarged Image" style={{ content: { display: "flex", justifyContent: "center", alignItems: "center" } }}>
        <img src={selectedImage} alt="Enlarged view" style={{ maxWidth: "90%", maxHeight: "90%" }} />
      </Modal>
    </Container>
  );
};

export default Index;