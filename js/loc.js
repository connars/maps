function centerMapOnUserLocation(map) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
  
        // Создайте иконку для маркера
        var markerIcon = {
          path: google.maps.SymbolPath.CIRCLE, // Форма - круг
          fillColor: "black", // Цвет заливки - красный
          fillOpacity: 1, // Непрозрачность заливки
          strokeColor: "red", // Цвет обводки - черный
          strokeWeight: 2, // Ширина обводки
          scale: 8 // Размер иконки
        };

        // Создайте маркер с пользовательской иконкой
        var userMarker = new google.maps.Marker({
          position: userLocation,
          map: map,
          title: "Ваше местоположение",
          icon: markerIcon
        });

  
        // Центрируйте карту на местоположении пользователя
        map.setCenter(userLocation);
      });
    } else {
      console.log("Геолокация не поддерживается в вашем браузере.");
    }
  }

  centerMapOnUserLocation(map);
