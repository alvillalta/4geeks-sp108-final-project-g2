import React, { useEffect, useRef } from "react";

export const Map = ({ apiKey, destination, activities, onAddActivity }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  const initMap = () => {
    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      zoom: 13,
      center: { lat: 40.4168, lng: -3.7038 }, // Madrid
      draggableCursor: "default" // Cursor siempre de clic
    });

    // Centrar en destino
    if (destination) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: destination }, (results, status) => {
        if (status === "OK" && results[0]) {
          mapInstance.current.setCenter(results[0].geometry.location);
        }
      });
    }

    // Listener: clic en el mapa
    mapInstance.current.addListener("click", (e) => {
      const latLng = e.latLng;
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === "OK" && results[0]) {
          getPlaceDetails(results[0].place_id, true);
        }
      });
    });

    // Pintar chinchetas de actividades iniciales
    if (activities?.length > 0) {
      activities.forEach((act) => {
        if (act.lat && act.lng) {
          addMarker({ lat: act.lat, lng: act.lng }, act.title);
        }
      });
    }
  };

  const getPlaceDetails = (placeId, addMarkerFlag = false) => {
    const service = new google.maps.places.PlacesService(mapInstance.current);

    service.getDetails(
      {
        placeId: placeId,
        fields: ["name", "formatted_address", "geometry", "url", "place_id"]
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          if (addMarkerFlag && place.geometry?.location) {
            addMarker(
              {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
              },
              place.name
            );
          }
          onAddActivity(place);
        }
      }
    );
  };

  const addMarker = (position, title) => {
    // Elimina marcadores previos si quieres que solo haya uno seleccionado
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    const marker = new google.maps.Marker({
      position,
      map: mapInstance.current,
      title
    });

    marker.addListener("click", () => {
      // Recupera detalles si no los tienes
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: position }, (results, status) => {
        if (status === "OK" && results[0]) {
          getPlaceDetails(results[0].place_id);
        }
      });
    });

    markersRef.current.push(marker);
  };

  return <div ref={mapRef} style={{ height: "100%", width: "100%" }} />;
};