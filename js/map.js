 // Ваш ключ API Google Maps
 const apiKey = "AIzaSyD0OYZfnj8uXou0tfCNNyxxkuLpX9MABDQ";
 let points = '';

 fetch('emap.json') // Загружаем файл emap.json с помощью fetch
 .then(response => response.json()) // Преобразуем ответ в формат JSON
 .then(data => {
   points = data;

   setTimeout(initMap(), 1000)
   setTimeout(GetCountryFilter(points), 1000)
  
 })
 .catch(error => console.error('Ошибка загрузки файла:', error));
 




 function GetCountryFilter(points) {
   const uniqueCountries = {}; // Объект для хранения уникальных стран

   // console.log("Все страны:");

   points.forEach(point => {
     const country = point.country_description;
     if (!uniqueCountries[country]) {
       uniqueCountries[country] = true; // Записываем страну в объект уникальных стран
       console.log(country); // Выводим уникальную страну в лог
     }
   });

 
  
   function checkAndAddCountryOptions() {
    if (uniqueCountries === undefined) {
        // После получения данных, вызывайте функцию снова
        checkAndAddCountryOptions();
    } else {
        // Вызывайте функцию для добавления опций стран в селект
        addCountryOptions(uniqueCountries);
    }
}

checkAndAddCountryOptions();







  

   // console.log("Уникальные страны:", Object.keys(uniqueCountries));

   // Очищаем массив points от дубликатов по стране
   const uniqueCountriesWithoutDuble = points.filter((point, index, self) => {
     return index === self.findIndex(p => p.country_description === point.country_description);
   });
  
   console.log("Массив без дубликатов:", uniqueCountriesWithoutDuble);
 }

 function addCountryOptions(uniqueCountries) {
   const selectElement = document.getElementById("countrySelect");

   // Очищаем существующие опции
   // selectElement.innerHTML = "";

   // Добавляем уникальные страны в выпадающий список
   Object.keys(uniqueCountries).forEach(country => {
     const option = document.createElement("option");
     option.value = country; // Приводим страну к нижнему регистру (если нужно)
     option.textContent = country;
     selectElement.appendChild(option);
   });
 }




 































 function initMap() {
   function filterMarkersByCategory(categoryGuid) {
     markers.forEach((marker) => {
       if (
         marker.point.category_guid === categoryGuid ||
         categoryGuid === "all"
       ) {
         marker.setMap(map);
       } else {
         marker.setMap(null);
       }
     });
   }

   const mapStyles = [
     {
       featureType: "water",
       elementType: "geometry",
       stylers: [
         { color: "#5DD4E8" }, // Цвет воды
       ],
     },
     {
       featureType: "landscape",
       elementType: "geometry",
       stylers: [
         { color: "#4A4A4A" }, // Цвет ландшафта
       ],
     },
     {
       featureType: "road",
       elementType: "geometry",
       stylers: [
         { color: "#767676" }, // Цвет дорог
       ],
     },
     {
       featureType: "poi",
       elementType: "labels.text",
       stylers: [
         { color: "#ffffff" }, // Цвет текста меток
       ],
     },
     {
       featureType: "poi",
       elementType: "labels.text.fill",
       stylers: [
         { color: "#888888" }, // Цвет текста меток
       ],
     },
     {
       featureType: "landscape.natural.landcover",
       elementType: "geometry",
       stylers: [
         { color: "#4A4A4A" }, // Красный цвет для натуральных зон
       ],
     },
     {
       featureType: "landscape.natural",
       elementType: "geometry",
       stylers: [
         { color: "#4A4A4A" }, // Красный цвет для натуральных зон
       ],
     },
   ];


   // Получаем элементы с id1 и id2
   const element1 = document.getElementById("1");
   const element2 = document.getElementById("2");

   // Добавляем обработчики клика
   element1.addEventListener("click", function () {
     // Изменяем вид карты на "terrain"
     map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
   });

   element2.addEventListener("click", function () {
     // Изменяем вид карты на "спутник" (Satellite)
     map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
   });


   const map = new google.maps.Map(document.getElementById("map"), {
     // center: { lat: 47.07146068591832, lng: 12.54857703342423 },
     center: { lat: 48.16601200857865, lng: 17.15407473591836 },
     zoom: 8,
     mapTypeId: "terrain",
     disableDefaultUI: true,
     styles: mapStyles,
     language: "en"
   });








   const markers = points.map((point) => {
    // Создайте объект, соответствующий `category_guid` и `iconUrl`
const iconUrls = {
  "abcc76b0-4d5f-11ed-98da-000c29627401": {
    true: "./icons/cr002.svg",
    false: "./icons/cg002.svg",
  },
  "e622df28-65d3-11ee-98df-000c29627401": {
    true: "./icons/cr001.svg",
    false: "./icons/cg001.svg",
  },
  "d8ad09e8-65d3-11ee-98df-000c29627401": {
    true: "./icons/cr004.svg",
    false: "./icons/cg004.svg",
  },
  "a420f35e-65ce-11ee-98df-000c29627401": {
    true: "./icons/cr003.svg",
    false: "./icons/cg003.svg",
  },
};

// Используйте объект для получения iconUrl
let iconUrl = "";
if (iconUrls[point.category_guid]) {
  iconUrl = iconUrls[point.category_guid][point.ehoss_present ? true : false];
}
     const marker = new google.maps.Marker({
       position: {
       lat: point.rawdata_latitude,
       lng: point.rawdata_longitude,
       },
       map: map,
       icon: {
         url: iconUrl,
         scaledSize: new google.maps.Size(40, 40),
       },
       category: point.category_guid,
       country: point.country_description,
       name: point.rawdata_code,
       url: point.rawdata_a,
   });

   // Создаем информационное окно
   const infowindow = new google.maps.InfoWindow({
       content: `<div class='infowin'>
       <strong>${point.category_mapdescription}</strong><br>
         <span></span>
         <a style="color: red" href="https://${point.rawdata_link}" target="_blank">${point.rawdata_link}</a>
         <br><br>
           Country: ${point.country_description} <br>
           Area: ${point.areacity_description} <br>
           Address: ${point.rawdata_address}
         </div>`
   });

   // Добавляем обработчик события click для маркера
   marker.addListener('click', () => {
       // Открываем информационное окно при клике на маркер
       infowindow.open(map, marker);
   });

           // Добавляем обработчик события click на карту
   google.maps.event.addListener(map, 'click', function() {
       // Закрываем информационное окно при клике на карту
       infowindow.close();
   });

   // Добавляем обработчик события zoom_changed
   google.maps.event.addListener(map, 'zoom_changed', function() {
       const currentZoom = map.getZoom();
       if (currentZoom < 8) {
           // Закрываем информационное окно, если зум больше 8
           infowindow.close();
       }
   });


   return marker;
   });

   function filterMarkersByCategory(categoryGuid) {
     markers.forEach((marker) => {
       const markerCategory = marker.category;
       if (markerCategory === categoryGuid || categoryGuid === "all") {
         marker.setMap(map);
       } else {
         marker.setMap(null);
       }
     });
   }

   function setupListeners() {
     // События на кликк all
     document.getElementById("all").addEventListener("click", (e) => {
       filterMarkersByCategory("all");
       e.currentTarget.classList.add("all");

       document.getElementById("farm").classList.remove("abcc76b0-4d5f-11ed-98da-000c29627401");
       document.getElementById("biogas").classList.remove("a420f35e-65ce-11ee-98df-000c29627401");
       document.getElementById("cattle-farm").classList.remove("d8ad09e8-65d3-11ee-98df-000c29627401");
       document.getElementById("ehoss").classList.remove("e622df28-65d3-11ee-98df-000c29627401")

       const currentZoom = map.getZoom();
       if (currentZoom < 8) {
         markersClusterAll.forEach((marker) => {
           marker.setVisible(true);
         });
         markersClusterFarms.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterBiogas.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterCattleFarm.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterEhoss.forEach((marker) => {
           marker.setVisible(false);
         });

       }
     });
     // События на клик farm
     document.getElementById("farm").addEventListener("click", (e) => {
       filterMarkersByCategory("abcc76b0-4d5f-11ed-98da-000c29627401");
       e.currentTarget.classList.add(
         "abcc76b0-4d5f-11ed-98da-000c29627401"
       );
       document.getElementById("all").classList.remove("all");
       document.getElementById("biogas").classList.remove("a420f35e-65ce-11ee-98df-000c29627401");
       document.getElementById("cattle-farm").classList.remove("d8ad09e8-65d3-11ee-98df-000c29627401");
       document.getElementById("ehoss").classList.remove("e622df28-65d3-11ee-98df-000c29627401")

       const currentZoom = map.getZoom();
       if (currentZoom < 8) {
         markersClusterFarms.forEach((marker) => {
           marker.setVisible(true);
         });
         markersClusterAll.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterBiogas.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterCattleFarm.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterEhoss.forEach((marker) => {
           marker.setVisible(false);
         });
       }
     });
     // События на клик biogas
     document.getElementById("biogas").addEventListener("click", (e) => {
       filterMarkersByCategory("a420f35e-65ce-11ee-98df-000c29627401");
       e.currentTarget.classList.add("a420f35e-65ce-11ee-98df-000c29627401");
       document.getElementById("all").classList.remove("all");
       document.getElementById("farm").classList.remove("abcc76b0-4d5f-11ed-98da-000c29627401");
       document.getElementById("cattle-farm").classList.remove("d8ad09e8-65d3-11ee-98df-000c29627401");
       document.getElementById("ehoss").classList.remove("e622df28-65d3-11ee-98df-000c29627401")

       const currentZoom = map.getZoom();
       if (currentZoom < 8) {
         markersClusterFarms.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterAll.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterBiogas.forEach((marker) => {
           marker.setVisible(true);
         });
         markersClusterCattleFarm.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterEhoss.forEach((marker) => {
           marker.setVisible(false);
         });
       }
     });
     // События на клик cattle farm
     document.getElementById("cattle-farm").addEventListener("click", (e) => {
       filterMarkersByCategory("d8ad09e8-65d3-11ee-98df-000c29627401");
       e.currentTarget.classList.add("d8ad09e8-65d3-11ee-98df-000c29627401");
       document.getElementById("all").classList.remove("all");
       document.getElementById("farm").classList.remove("abcc76b0-4d5f-11ed-98da-000c29627401");
       document.getElementById("biogas").classList.remove("a420f35e-65ce-11ee-98df-000c29627401");
       document.getElementById("ehoss").classList.remove("e622df28-65d3-11ee-98df-000c29627401");

       const currentZoom = map.getZoom();
       if (currentZoom < 8) {
         markersClusterFarms.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterAll.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterBiogas.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterCattleFarm.forEach((marker) => {
           marker.setVisible(true);
         });
         markersClusterEhoss.forEach((marker) => {
           marker.setVisible(false);
           console.log(213123);
         });
       }
     });
     // События на клик ehoss
     document.getElementById("ehoss").addEventListener("click", (e) => {
       filterMarkersByCategory("e622df28-65d3-11ee-98df-000c29627401");
       e.currentTarget.classList.add("e622df28-65d3-11ee-98df-000c29627401");

       document.getElementById("all").classList.remove("all");
       document.getElementById("farm").classList.remove("abcc76b0-4d5f-11ed-98da-000c29627401");
       document.getElementById("biogas").classList.remove("a420f35e-65ce-11ee-98df-000c29627401");
       document.getElementById("cattle-farm").classList.remove("d8ad09e8-65d3-11ee-98df-000c29627401");

       const currentZoom = map.getZoom();
       if (currentZoom < 8) {
         markersClusterFarms.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterAll.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterBiogas.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterCattleFarm.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterEhoss.forEach((marker) => {
           marker.setVisible(true);
         });
       }
     });
   }
   setupListeners();

   const uniquePoints = {};

   points.forEach((point) => {
     const key = `${point.areacity_latitude},${point.areacity_longitude}`;
     if (!uniquePoints[key]) {
       uniquePoints[key] = {
         point: point,
         category: point.category_guid,
         country: point.country_description,
         count: 1,
       };
     } else {
       uniquePoints[key].count++;
     }
   });

   const markersClusterAll = Object.values(uniquePoints).map(
     (uniquePoint) => {
       const point = uniquePoint.point;
       const count = uniquePoint.count;
       const cat = uniquePoint.category;

       const country = uniquePoint.country; 
       // console.log(country);
       const marker = new google.maps.Marker({
         position: {
           lat: point.areacity_latitude,
           lng: point.areacity_longitude,
         },
         map: map,
         country: country,
         icon: {
           path: google.maps.SymbolPath.CIRCLE,
           scale: 15,
           fillColor: "black",
           fillOpacity: 1,
           strokeColor: "red",
           strokeWeight: 2,
         },
         label: {
           text: `${count}`,
           color: "white",
           fontSize: "16px",
         },
       });



       const infowindow = new google.maps.InfoWindow({
         content: `Objects: ${country}`,
       });

       marker.addListener("click", () => {
         infowindow.open(map, marker);
       });

       return marker;
     }
   );
   console.log(markersClusterAll);
   
   markersClusterAll.forEach((marker) => {
     marker.setVisible(false);
   });

   function createClustersForCategory(points, categoryGuid) {
     const clusters = {};

     points
       .filter((point) => point.category_guid === categoryGuid)
       .forEach((point) => {
         const key = `${point.areacity_latitude},${point.areacity_longitude}`;
         if (!clusters[key]) {
           clusters[key] = {
             points: [point],
           };
         } else {
           clusters[key].points.push(point);
         }
       });

     return Object.values(clusters).map((cluster) => {
       const clusterSize = cluster.points.length;
       const clusterCenter = cluster.points.reduce(
         (center, point) => {
           center.lat += point.areacity_latitude;
           center.lng += point.areacity_longitude;
           return center;
         },
         { lat: 0, lng: 0 }
       );
       clusterCenter.lat /= clusterSize;
       clusterCenter.lng /= clusterSize;

       const marker = new google.maps.Marker({
         position: clusterCenter,
         map: map,
         icon: {
           path: google.maps.SymbolPath.CIRCLE,
           scale: 15,
           fillColor: "black",
           fillOpacity: 1,
           strokeColor: "red",
           strokeWeight: 2,
         },
         label: {
           text: clusterSize.toString(),
           color: "white",
           fontSize: "16px",
         },
       });

       // const infowindow = new google.maps.InfoWindow({
       //   content: `Objects: ${clusterSize}`,
       // });

       // marker.addListener("click", () => {
       //   infowindow.open(map, marker);
       // });

       return marker;
     });
   }

   // Использование функции для создания кластеров
   const markersClusterFarms = createClustersForCategory(
     points,
     "abcc76b0-4d5f-11ed-98da-000c29627401"
   );

   const markersClusterBiogas = createClustersForCategory(
     points,
     "a420f35e-65ce-11ee-98df-000c29627401"
   );

   const markersClusterCattleFarm = createClustersForCategory(
     points,
     "d8ad09e8-65d3-11ee-98df-000c29627401"
   );

   const markersClusterEhoss = createClustersForCategory(
     points,
     "e622df28-65d3-11ee-98df-000c29627401"
   );


   markersClusterFarms.forEach((marker) => {
     marker.setVisible(false);
   });

   markersClusterBiogas.forEach((marker) => {
     marker.setVisible(false);
   });


   markersClusterCattleFarm.forEach((marker) => {
     marker.setVisible(false);
   });


   markersClusterEhoss.forEach((marker) => {
     marker.setVisible(false);
   });


   let catItems = document.querySelectorAll(".cat-item");
  

    // Функция, которая будет вызываться при изменении значения селекта
    function handleSelectChange() {
        const selectedCountry = document.getElementById("countrySelect").value;
        // filterMapByCountry(selectedCountry, markers);

        console.log(selectedCountry);
    }
    
    // Слушатель события изменения значения селекта
    document.getElementById("countrySelect").addEventListener("change", handleSelectChange);
    
    // function filterMapByCountry(selectedCountry, markers) {
    //     const currentZoom = map.getZoom();

    //     markers.forEach((marker) => {
    //         if (selectedCountry === "default" || marker.country === selectedCountry) {
    //             if(currentZoom < 8) {
    //                 marker.setVisible(false);
    //             } else {
    //                 marker.setVisible(true);
    //             }
               
    //         } else {
    //             marker.setVisible(false);
    //         }
    //     });
    // }

   
    
   map.addListener("zoom_changed", function () {
     const currentZoom = map.getZoom();
     const selectedCountry = document.getElementById("countrySelect").value;
    //  console.log(catItems[2]);
    //  console.log(catItems[3]);
  
    //  console.log(catItems[4]);
     if (currentZoom < 8) {

        
       markers.forEach((marker) => {
         marker.setVisible(false);
       });


    
   

       if (catItems[0].classList.contains("all")) {
         markersClusterAll.forEach((marker) => {
           marker.setVisible(true);
         });

         markersClusterEhoss.forEach((marker) => {
           marker.setVisible(false);
         });

         markersClusterCattleFarm.forEach((marker) => {
           marker.setVisible(false);
         });

         markersClusterFarms.forEach((marker) => {
           marker.setVisible(false);
         });

         markersClusterBiogas.forEach((marker) => {
           marker.setVisible(false);
         });

       } else if (catItems[1].classList.contains("abcc76b0-4d5f-11ed-98da-000c29627401")) {
         
         markersClusterFarms.forEach((marker) => {
           marker.setVisible(true);
         });

         markersClusterEhoss.forEach((marker) => {
           marker.setVisible(false);
         });

         markersClusterCattleFarm.forEach((marker) => {
           marker.setVisible(false);
         });

         markersClusterBiogas.forEach((marker) => {
           marker.setVisible(false);
         });

         markersClusterAll.forEach((marker) => {
           marker.setVisible(false);
         });
       }  else if (catItems[2].classList.contains("a420f35e-65ce-11ee-98df-000c29627401")) {
         markersClusterBiogas.forEach((marker) => {
           marker.setVisible(true);
         });
         markersClusterFarms.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterAll.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterCattleFarm.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterEhoss.forEach((marker) => {
           marker.setVisible(false);
         });
       } else if (catItems[3].classList.contains("d8ad09e8-65d3-11ee-98df-000c29627401")) {
         markersClusterBiogas.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterFarms.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterAll.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterCattleFarm.forEach((marker) => {
           marker.setVisible(true);
         });
         markersClusterEhoss.forEach((marker) => {
           marker.setVisible(false);
         });
       } else if (catItems[4].classList.contains("e622df28-65d3-11ee-98df-000c29627401")) {
         markersClusterBiogas.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterFarms.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterAll.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterCattleFarm.forEach((marker) => {
           marker.setVisible(false);
         });
         markersClusterEhoss.forEach((marker) => {
           marker.setVisible(true);
         });
       } else {
         console.log('any class not found');
       }
     } else {


        // markers.forEach((marker) => {
        //      if (selectedCountry === "default" || marker.country === selectedCountry) {
        //         marker.setVisible(true);
        //         console.log(1);
        //     } else {
        //         marker.setVisible(false);
        //         console.log(2);
        //     }
        // });

       function hrefggleMarkersWithDelay(markers, delay) {
       markers.forEach((marker, index) => {
         setTimeout(() => {
           marker.setVisible(true);
         }, index * delay);
       });
     }

     hrefggleMarkersWithDelay(markers, 1);

       markersClusterAll.forEach((marker) => {
         marker.setVisible(false);
       });

       markersClusterFarms.forEach((marker) => {
         marker.setVisible(false);
       });

       markersClusterBiogas.forEach((marker) => {
         marker.setVisible(false);
       });

       markersClusterCattleFarm.forEach((marker) => {
           marker.setVisible(false);
       });

       markersClusterEhoss.forEach((marker) => {
           marker.setVisible(false);
       });
     }
   });
 }


 document.querySelector('.header__menu-btn').addEventListener('click', () => {
     document.querySelector('.header__navbar').classList.toggle('active')
 })

