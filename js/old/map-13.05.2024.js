// Ваш ключ API Google Maps
const apiKey = "AIzaSyD0OYZfnj8uXou0tfCNNyxxkuLpX9MABDQ";
let points;
let stats = "";




fetch("https://form.ehoss.com/get-data/rawdata") // Загружаем файл emap.json с помощью fetch
  .then((response) => response.json()) // Преобразуем ответ в формат JSON
  .then((data) => {
    points = data;
    console.log(data);
    // setTimeout(() => initMap(), 1000);
    // setTimeout(() => GetCountryFilter(points), 1000);
    setTimeout(() => initMap(), 1000);
    // Генерируем статистику
    // generateStats(points);
  })
  .catch((error) => console.error("Ошибка загрузки файла:", error));


let map;

function initMap() {
  const mapStyles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ]

  // Получаем элементы с id1 и id2
  const element1 = document.getElementById("1");
  const element2 = document.getElementById("2");

  // Добавляем обработчики клика
  element1.addEventListener("click", function () {
    // Изменяем вид карты на "terrain"
    element1.classList.add('active')
    element2.classList.remove('active')
    map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
  });

  element2.addEventListener("click", function () {
    // Изменяем вид карты на "спутник" (Satellite)
    element1.classList.remove('active')
    element2.classList.add('active')
    map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
  });

  const allowedBounds = {
    north: 40.774,
    south: 40.712,
    east: -74.125,
    west: -74.226
  };

  map = new google.maps.Map(document.getElementById("map"), {
    // center: { lat: 47.07146068591832, lng: 12.54857703342423 },
    center: { lat: 48.16601200857865, lng: 17.15407473591836 },
    zoom: 8,
    mapTypeId: "terrain",
    disableDefaultUI: true,
    styles: mapStyles,
    language: "en",
    minZoom: 2,

  });




   // Добавляем кнопки увеличения и уменьшения
   const zoomInButton = document.getElementById("plus");
   const zoomOutButton = document.getElementById("minus");
 
   // Обработчик клика на кнопке увеличения
   zoomInButton.addEventListener("click", () => {
     const currentZoom = map.getZoom();
     if (currentZoom < 20) { // Максимальный уровень увеличения
       map.setZoom(currentZoom + 1);
     }

    
   });
 
   // Обработчик клика на кнопке уменьшения
   zoomOutButton.addEventListener("click", () => {
     const currentZoom = map.getZoom();
     if (currentZoom > 0) { // Минимальный уровень увеличения
       map.setZoom(currentZoom - 1);
     }

     console.log(currentZoom);
   });
   

  const markers = points
  .filter((point) => point.ispublicdata === 1) 
  .map((point) => {
    // Создайте объект, соответствующий `category_guid` и `iconUrl`
    const iconUrls = {
      "abcc76b0-4d5f-11ed-98da-000c29627401": {
        1: "https://dainty-pasca-269977.netlify.app/icons/cr002.svg",
        0: "https://dainty-pasca-269977.netlify.app/icons/cg002.svg",
      },
      "e622df28-65d3-11ee-98df-000c29627401": {
        1: "https://dainty-pasca-269977.netlify.app/icons/cr001.svg",
        0: "https://dainty-pasca-269977.netlify.app/icons/cg001.svg",
      },
      "d8ad09e8-65d3-11ee-98df-000c29627401": {
        1: "https://dainty-pasca-269977.netlify.app/icons/cr004.svg",
        0: "https://dainty-pasca-269977.netlify.app/icons/cg004.svg",
      },
      "a420f35e-65ce-11ee-98df-000c29627401": {
        1: "https://dainty-pasca-269977.netlify.app/icons/cr003.svg",
        0: "https://dainty-pasca-269977.netlify.app/icons/cg003.svg",
      },
    };

    document.querySelector('.pixel').addEventListener('click',() => {
      markers.forEach((marker) => {
          marker.setVisible(false);
      });

      document.querySelector
      
      const radioButtons = document.getElementsByName("catOption");
      radioButtons[0].checked = false;
      radioButtons[1].checked = false;
      radioButtons[2].checked = false;
      // radioButtons[3].checked = false;
     
      document.querySelector('#openCat .cat-drop').classList.remove('active')
      document.querySelector('#openCat').classList.remove('active')
      hideClusters()
    })

    // Используйте объект для получения iconUrl
    let iconUrl = "";
    if (iconUrls[point.category_guid]) {
      iconUrl =
        iconUrls[point.category_guid][point.isehosspresent ? 1 : 0];
    }
    const marker = new google.maps.Marker({
      position: {
        lat: point.latitude,
        lng: point.longitude,
      },
      map: map,
      icon: {
        url: iconUrl,
        scaledSize: new google.maps.Size(40, 40),
      },
      category: point.category_guid,
      country: point.country_guid,
      name: point.rawdata_code,
      url: point.rawdata_a,
    });


    // console.log(point.guid);
   

    let base64Image = [];
    let infowindow = new google.maps.InfoWindow({ content: ``, });

    marker.addListener('click', () => {
      getImageByGuid(point.guid).then((data) => {
        base64Image = data;
        console.log(data);

            // Проверяем, есть ли изображения
        if (base64Image.length > 0) {
          let imagesHTML = ''; // Строка для хранения HTML слайдера
          
          // Создаем HTML для каждого изображения в массиве
          base64Image.forEach(image => {
            imagesHTML += `<div class="swiper-slide"><img style='height: 200px;' src="data:image/jpeg;base64,${image}" /></div>`;
          });

          // Создаем HTML для информационного окна с Swiper слайдером
          const infowindowContent = `
            <div class='infowin'>
             
              <div class="swiper-container-${point.guid}">
                <div class="swiper-wrapper">
                  ${imagesHTML}
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-pagination"></div>
              </div>
              <div class='infowin-contant'>
                <a style="color: red" href="https://${point.description}" target="_blank">${point.description}</a><br><br>
                Address: ${point.address}
              </div>
            </div>`;

          infowindow = new google.maps.InfoWindow({
            content: infowindowContent,
          });

          infowindow.open(map, marker); 
          // Открываем окно
          
          // Инициализируем Swiper

          setTimeout(()=> {
            const swiper = new Swiper(`.swiper-container-${point.guid}`, {
              slidesPerView: 1,
              pagination: {
                el: ".swiper-pagination",
                type: "progressbar",
              },
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
            });
          }, 500)
        
        } else {
          infowindow = new google.maps.InfoWindow({
            content: `<div class='infowin'>
            <div class='infowin-contant'>
              <a style="color: red" href="https://${point.description}" target="_blank">${point.description}</a><br><br>
              Address: ${point.address}
            </div>`,
          });
        }
      
    
        infowindow.open(map, marker); // Открываем окно
      })
      .catch((error) => {
        console.error("Ошибка загрузки изображения:", error);
      });
    });

    let currentInfoWindow = null;

    // Изменение обработчика события на closeclick
    google.maps.event.addListener(infowindow, 'closeclick', function () {
      infowindow.close();
  });

    // Добавляем обработчик события click на карту
    google.maps.event.addListener(map, "click", function () {
      // Закрываем информационное окно при клике на карту
      infowindow.close();
    });

    // Добавляем обработчик события zoom_changed
    google.maps.event.addListener(map, "zoom_changed", function () {
      const currentZoom = map.getZoom();
      if (currentZoom < 8) {
        // Закрываем информационное окно, если зум больше 8
        infowindow.close();
      }
    });
    return marker;
  });

 

  // Определите опции для кластеризатора.


  let filteredMarkers = [];
  const clusterOptions = {
    gridSize: 50, // Размер кластера в пикселях
    maxZoom: 7,  // Максимальное увеличение, на котором кластеры отображаются
  };


  
  let markerCluster = new MarkerClusterer(map, filteredMarkers, clusterOptions); // Создаем новые кластеры с отфильтрованными маркерами












  

  function filterMarkersByCategory(categoryGuid) {

    markerCluster.clearMarkers(); // Очищаем существующие кластеры
    let filteredMarkers = [];
    // Создаем новый массив для отфильтрованных маркеров
  

    const countries = document.querySelectorAll('.country-item');
    let selectedCountry;

    countries.forEach(country => {
      if (country.classList.contains('active')) {
        selectedCountry = country.dataset.guid;
      }
    });

    console.log(selectedCountry);

    markers.forEach((marker) => {
      const markerCategory = marker.category;
      if (
        (markerCategory === categoryGuid || categoryGuid === "all") &&
        (selectedCountry === undefined || marker.country === selectedCountry)
      ) {
      
        filteredMarkers.push(marker); 
        marker.setMap(map); // Показываем маркеры, которые соответствуют категории
        marker.setVisible(true);
        // console.log(selectedCountry);
        // console.log(filteredMarkers);
        // console.log(1);
      } else {
        marker.setMap(null); // Скрываем маркеры, которые не соответствуют категории
      //  console.log(1222);
      }
    });
  
    markerCluster = new MarkerClusterer(map, filteredMarkers, clusterOptions); // Создаем новые кластеры с отфильтрованными маркерами
  }

  function hideClusters() {
    markerCluster.clearMarkers();

    console.log(12414124);
  }

  filterMarkersByCategory('all')







  function filterMapByCountry(selectedCountry, markers) {

    hideHeatMap()
    const catItem = document.querySelector('#categoriesDrop');
    const catItems = catItem.querySelectorAll('.cat-item')

    let secondClass;
    catItems.forEach((item) => {
      // Получаем список классов элемента
      const classes = item.classList;
      // Проверяем, есть ли у элемента два класса
      if (classes.length === 2) {
        // Второй класс это classes[1] (индекс 1)
        secondClass = classes[1];
        console.log(secondClass);
      }
    });
 
  
    console.log(secondClass + 'тут');

  // document.querySelectorAll('.cat-item')
  markerCluster.clearMarkers(); 
  let filteredMarkers = [];
    console.log(selectedCountry);
  markers.forEach((marker) => {
    const markerCategory = marker.category;
    if (
      (markerCategory === secondClass || secondClass === undefined) &&
      (selectedCountry === "default" || marker.country === selectedCountry)
      ) {
        console.log(selectedCountry);
      marker.setVisible(true);
      filteredMarkers.push(marker); 
    } else {
      marker.setVisible(false);
    }
  });

  markerCluster = new MarkerClusterer(map, filteredMarkers, clusterOptions); // Создаем новые кластеры с отфильтрованными маркерами
}


let countriesData;

 async function fetchData() {
   try {
     const response = await fetch("https://form.ehoss.com/get-data/countries");
     if (response.ok) {
       const data = await response.json();
       countriesData = data;
       console.log(countriesData);
       displayCountries(countriesData);
     } else {
       console.error("Ошибка загрузки файла:", response.status);
     }
   } catch (error) {
     console.error("Ошибка загрузки файла:", error);
   }
 }
 
 fetchData();


// Предполагается, что у вас есть контейнер с id "countriesContainer" на странице.
// Получаем контейнер для стран
const countriesContainer = document.getElementById("countriesContainer");

function displayCountries(countries) {
  if (!countriesContainer) {
    console.error("Контейнер для стран не найден");
    return;
  }

  countries.forEach(country => {
    const countryElement = document.createElement("div");
    countryElement.classList.add('country-item');
    countryElement.dataset.guid = country.guid;

    const circleElement = document.createElement("div");
    circleElement.classList.add('circle');

    const pElement = document.createElement("p");
    pElement.textContent = country.description;

    // Добавляем обработчик события на клик по стране
    countryElement.addEventListener("click", () => {
      // Удаляем класс 'active' у всех элементов стран
      countriesContainer.querySelectorAll('.country-item').forEach(element => {
        element.classList.remove('active');
      });

       // Устанавливаем название выбранной страны
  const selectedCountryName = country.description;
  document.querySelector('.countyName').textContent = selectedCountryName;

        // Добавляем класс 'active' к выбранному элементу
      countryElement.classList.add('active');

      // Получаем guid выбранной страны
      const selectedCountryGuid = countryElement.dataset.guid;
      // Вызываем функцию filterMapByCountry с передачей guid
      filterMapByCountry(selectedCountryGuid, markers);
    });

   
    countryElement.appendChild(pElement);
    countryElement.appendChild(circleElement);
    countriesContainer.appendChild(countryElement);
  });
}









































  function setupListeners() {
    document.getElementById("all").addEventListener("click", (e) => {
      filterMarkersByCategory("all");
      filterMapByCountry('default', markers)
      document.querySelector('#openCount').classList.remove('active')
      document.getElementById("all").click()

      e.currentTarget.classList.add("all");
      hideHeatMap()
      const radioButtons = document.getElementsByName("catOption");
      radioButtons.forEach(e => {
        e.checked = false;
      })
      document.querySelector('.countyNameCat').innerHTML = `Category`
     
      document.querySelector('.countyName').textContent = `Country`
      countriesContainer.querySelectorAll('.country-item').forEach(element => {
        element.classList.remove('active');
      });


      markers.forEach((marker) => {

   
          marker.setMap(map); 
          marker.setVisible(true);

     

      });

      markerCluster.clearMarkers(); 

      markerCluster = new MarkerClusterer(map, markers, clusterOptions); // Создаем новые кластеры с отфильтрованными маркерами

      
     
      // document.querySelector('#radio1').click()
      // document.querySelector('#countrySelect').classList.remove('active');
      document.querySelector('#openCat .cat-drop').classList.remove('active')
      // const radioButtons2 = document.getElementsByName("countryOption");


      document
        .getElementById("farm")
        .classList.remove("abcc76b0-4d5f-11ed-98da-000c29627401");
      document
        .getElementById("biogas")
        .classList.remove("a420f35e-65ce-11ee-98df-000c29627401");
      document
        .getElementById("cattle-farm")
        .classList.remove("d8ad09e8-65d3-11ee-98df-000c29627401");
      document
        .getElementById("ehoss")
        .classList.remove("e622df28-65d3-11ee-98df-000c29627401");
    });
    // События на клик farm
    document.getElementById("farm").addEventListener("click", (e) => {
      filterMarkersByCategory("abcc76b0-4d5f-11ed-98da-000c29627401");
      e.currentTarget.classList.add("abcc76b0-4d5f-11ed-98da-000c29627401");
     
      hideHeatMap()
      const radioButtons = document.getElementsByName("catOption");
      radioButtons[0].checked = true;
      document.querySelector('.countyNameCat').innerHTML = `${radioButtons[0].value}`
      

      document.getElementById("all").classList.remove("all");
      document
        .getElementById("biogas")
        .classList.remove("a420f35e-65ce-11ee-98df-000c29627401");
      document
        .getElementById("cattle-farm")
        .classList.remove("d8ad09e8-65d3-11ee-98df-000c29627401");
      document
        .getElementById("ehoss")
        .classList.remove("e622df28-65d3-11ee-98df-000c29627401");
    });
    // События на клик biogas
    document.getElementById("biogas").addEventListener("click", (e) => {
      filterMarkersByCategory("a420f35e-65ce-11ee-98df-000c29627401");
      e.currentTarget.classList.add("a420f35e-65ce-11ee-98df-000c29627401");


      hideHeatMap()
      const radioButtons = document.getElementsByName("catOption");
      radioButtons[1].checked = true;
      document.querySelector('.countyNameCat').innerHTML = `${radioButtons[1].value}`


      document.getElementById("all").classList.remove("all");
      document
        .getElementById("farm")
        .classList.remove("abcc76b0-4d5f-11ed-98da-000c29627401");
      document
        .getElementById("cattle-farm")
        .classList.remove("d8ad09e8-65d3-11ee-98df-000c29627401");
      document
        .getElementById("ehoss")
        .classList.remove("e622df28-65d3-11ee-98df-000c29627401");
    });
    // События на клик cattle farm
    document.getElementById("cattle-farm").addEventListener("click", (e) => {
      filterMarkersByCategory("d8ad09e8-65d3-11ee-98df-000c29627401");
      e.currentTarget.classList.add("d8ad09e8-65d3-11ee-98df-000c29627401");

      hideHeatMap()
      const radioButtons = document.getElementsByName("catOption");
      radioButtons[2].checked = true;
      document.querySelector('.countyNameCat').innerHTML = `${radioButtons[2].value}`

      document.getElementById("all").classList.remove("all");
      document
        .getElementById("farm")
        .classList.remove("abcc76b0-4d5f-11ed-98da-000c29627401");
      document
        .getElementById("biogas")
        .classList.remove("a420f35e-65ce-11ee-98df-000c29627401");
      document
        .getElementById("ehoss")
        .classList.remove("e622df28-65d3-11ee-98df-000c29627401");
    });
    // События на клик ehoss
    // document.getElementById("ehoss").addEventListener("click", (e) => {
    //   filterMarkersByCategory("e622df28-65d3-11ee-98df-000c29627401");
    //   e.currentTarget.classList.add("e622df28-65d3-11ee-98df-000c29627401");


    //   hideHeatMap()
    //   const radioButtons = document.getElementsByName("catOption");
    //   radioButtons[3].checked = true;
    //   document.querySelector('.countyNameCat').innerHTML = `${radioButtons[3].value}`


    //   document.getElementById("all").classList.remove("all");
    //   document
    //     .getElementById("farm")
    //     .classList.remove("abcc76b0-4d5f-11ed-98da-000c29627401");
    //   document
    //     .getElementById("biogas")
    //     .classList.remove("a420f35e-65ce-11ee-98df-000c29627401");
    //   document
    //     .getElementById("cattle-farm")
    //     .classList.remove("d8ad09e8-65d3-11ee-98df-000c29627401");
    // });
  }
  setupListeners();




function refreshSelectChange() {
  const radioButtons = document.getElementsByName("countryOption");

  let selectedCountry;

  radioButtons.forEach(radio => {
      if (radio.checked) {
        if (radio.value == "default") {
          selectedCountry = "Countries";
        } else {
          selectedCountry = radio.value;
        }
      }
  });

  document.querySelector('.countyName').innerHTML = `${selectedCountry}`
}

}

document.querySelector(".header__menu-btn").addEventListener("click", () => {
  document.querySelector(".header__navbar").classList.toggle("active");
});

window.onload = () => {

  setTimeout(() => {
    document.querySelector('.preloader__wrapper').classList.add('hidden');
    // document.querySelector('#countrySelect').classList.remove('active');
    // document.querySelector('#all').click();
  }, 1200)

  
  setTimeout(() => {
    document.querySelector('#all').click();
  }, 1400)


}


let dropCat = document.querySelector('#categoriesDrop');


dropCat.querySelectorAll('.cat-item').forEach((item) => {
  item.addEventListener('click', () => {
    document.querySelector('.cat-drop').classList.toggle('active');
    refreshSelectChangeCategory()
    document.querySelector('#openCount').classList.remove('active')
  })
})

document.querySelector('#openCat').addEventListener('click', () => {
  document.querySelector('#openCat').classList.toggle('active')
  document.querySelector('#openCount').classList.remove('active')
})

// document.querySelector('#openCount').addEventListener('click', () => {
//   document.querySelector('#countrySelect').classList.toggle('active')
//   document.querySelector('#openCat').classList.remove('active')
//   document.querySelector('#openCat .cat-drop').classList.remove('active')
// })

function refreshSelectChangeCategory() {
  const radioButtons = document.getElementsByName("catOption");

  let selectedCategory;

  radioButtons.forEach(radio => {
      if (radio.checked) {
        selectedCategory = radio.value;
      }
  });

  document.querySelector('.countyNameCat').innerHTML = `${selectedCategory}`
}


document.querySelector('#map').addEventListener('click', () => {
  document.querySelector('#openCat .cat-drop').classList.remove('active')
  document.querySelector('#openCat').classList.remove('active')
  document.querySelector('#openCount').classList.remove('active')
  // document.querySelector('#countrySelect').classList.remove('active')
})





let RawData = "";

let NewPoints;

fetch("https://form.ehoss.com/get-data/rawdata")
  .then((response) => response.json())
  .then((data) => {
    RawData = data;
    // console.log(data);

    // Вызов функции для обработки данных
    processData(RawData);
  })
  .catch((error) => console.error("Ошибка загрузки файла:", error));

function processData(data) {
  // Здесь вы можете выполнять нужные действия с данными
  // console.log("Данные обработаны:", data);
  NewPoints = data;
  // console.log(NewPoints);
}

let heatmap;
let heatmapInitialized = false;

function showHeatMap(RawData) {
  
  if (heatmap) {
     // Если карта скрыта, делаем ее видимой
     heatmap.setMap(map);
  }

  if (!heatmapInitialized) {
    console.trace();
    console.log('func Start');
    var heatMapData = RawData.filter(function(point) {
      return point.ispublicdata === 1;
    })
    .map(function(point) {
      return {
        location: new google.maps.LatLng(point.latitude, point.longitude),
        weight: point.manure_volume === 0 ? 1 : point.manure_volume
      };
    });

    console.log(heatMapData);

    // Создаем экземпляр тепловой карты
    heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatMapData,
      radius: 30
    });

    // Устанавливаем карту, на которой будет отображаться тепловая карта (замените 'map' на свою переменную с картой)
    heatmap.setMap(map);

    heatmapInitialized = true;
  }
}

function hideHeatMap() {
  if (heatmap) {
    heatmap.setMap(null);
  }
}



document.querySelector('.heat').addEventListener('click', () => {
  showHeatMap(NewPoints);
  document.querySelector('.pixel').click()
  document.querySelector('#openCount').classList.remove('active')

});



 // Получите все кнопки cat-item
 const catButtons = document.querySelectorAll('.cat-item');

 // Добавьте обработчик события для каждой кнопки
 catButtons.forEach(button => {
     button.addEventListener('click', () => {
         // Удалите класс "focus" у всех кнопок
         catButtons.forEach(otherButton => {
             otherButton.classList.remove('focus');
         });

         // Добавьте класс "focus" только к нажатой кнопке
         button.classList.add('focus');
     });
 });


 document.querySelector('#openCount').addEventListener('click', () => {
  document.querySelector('#openCount').classList.add('active')
  document.querySelector('#openCat .cat-drop').classList.remove('active')
  document.querySelector('#openCat').classList.remove('active')
 })








 
 async function getImageByGuid(guid) {
  return await fetch("https://form.ehoss.com/get-data/rawdata_images")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const foundElements = data.filter(item => item.rawdata_guid === guid);

    

      if (foundElements.length > 0) {
      
        const images = foundElements.map(element => element.image);
        console.log(images);
        return images;
      } else {
        return []; // Возвращаем пустой массив, если элементы не найдены
      }
    })
    .catch((error) => {
      console.error("Ошибка загрузки файла:", error);
      return []; // Возвращаем пустой массив в случае ошибки
    });
}

getImageByGuid(guid)
  .then((images) => {
    console.log("Images:", images);
    // Здесь вы можете использовать полученные изображения
  });




