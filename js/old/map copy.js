// Ваш ключ API Google Maps
const apiKey = "AIzaSyD0OYZfnj8uXou0tfCNNyxxkuLpX9MABDQ";
let points = "";
let stats = "";

fetch("emap.json") // Загружаем файл emap.json с помощью fetch
  .then((response) => response.json()) // Преобразуем ответ в формат JSON
  .then((data) => {
    points = data;
    setTimeout(() => initMap(), 1000);
  })
  .catch((error) => console.error("Ошибка загрузки файла:", error));


let map;

function initMap() {
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

  map = new google.maps.Map(document.getElementById("map"), {
    // center: { lat: 47.07146068591832, lng: 12.54857703342423 },
    center: { lat: 48.16601200857865, lng: 17.15407473591836 },
    zoom: 8,
    mapTypeId: "terrain",
    disableDefaultUI: true,
    styles: mapStyles,
    language: "en",
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
   });
   

  const markers = points.map((point) => {
    // Создайте объект, соответствующий `category_guid` и `iconUrl`
    const iconUrls = {
      "abcc76b0-4d5f-11ed-98da-000c29627401": {
        true: "https://dainty-pasca-269977.netlify.app/icons/cr002.svg",
        false: "https://dainty-pasca-269977.netlify.app/icons/cg002.svg",
      },
      "e622df28-65d3-11ee-98df-000c29627401": {
        true: "https://dainty-pasca-269977.netlify.app/icons/cr001.svg",
        false: "https://dainty-pasca-269977.netlify.app/icons/cg001.svg",
      },
      "d8ad09e8-65d3-11ee-98df-000c29627401": {
        true: "https://dainty-pasca-269977.netlify.app/icons/cr004.svg",
        false: "https://dainty-pasca-269977.netlify.app/icons/cg004.svg",
      },
      "a420f35e-65ce-11ee-98df-000c29627401": {
        true: "https://dainty-pasca-269977.netlify.app/icons/cr003.svg",
        false: "https://dainty-pasca-269977.netlify.app/icons/cg003.svg",
      },
    };

  

    // Используйте объект для получения iconUrl
    let iconUrl = "";
    if (iconUrls[point.category_guid]) {
      iconUrl =
        iconUrls[point.category_guid][point.ehoss_present ? true : false];
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
         </div>`,
    });
    let currentInfoWindow = null;
    
    // Добавляем обработчик события click для маркера
    marker.addListener("click", () => {
      // Открываем информационное окно при клике на маркер
      infowindow.open(map, marker);
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
    const radioButtons = document.getElementsByName("countryOption");

    let selectedCountry;
  
    radioButtons.forEach(radio => {
        if (radio.checked) {
            selectedCountry = radio.value;
        }
    });

    markers.forEach((marker) => {
      const markerCategory = marker.category;
      if (
        (markerCategory === categoryGuid || categoryGuid === "all") &&
        (selectedCountry === "default" || marker.country === selectedCountry)
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



  function filterMapByCountry(selectedCountry, markers) {

  
      const catItems = document.querySelectorAll('.cat-item');
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
   
    


    document.querySelectorAll('.cat-item')
    markerCluster.clearMarkers(); 
    let filteredMarkers = [];
    
    console.log(markers);
    markers.forEach((marker) => {

      const markerCategory = marker.category;

      if (
        (markerCategory === secondClass || secondClass === "all") &&
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

  filterMarkersByCategory('all')

  // filterMapByCountry('dc9cebb9-e7c4-11ec-98d7-000c29627401', markers)





  function setupListeners() {
    // События на кликк all
    document.getElementById("all").addEventListener("click", (e) => {
      filterMarkersByCategory("all");
      e.currentTarget.classList.add("all");
    
    

      const radioButtons = document.getElementsByName("catOption");
      radioButtons.forEach(e => {
        e.checked = false;
      })
      document.querySelector('.countyNameCat').innerHTML = `Category`

      
      document.querySelector('#radio1').click()
      document.querySelector('#countrySelect').classList.remove('active');
      document.querySelector('#openCat .cat-drop').classList.remove('active')
      // const radioButtons2 = document.getElementsByName("countryOption");


      // radioButtons2.forEach(e => {
      //   e.checked = false;
      // });
    
      // document.querySelector('.countyName').innerHTML = "Countries"



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
    document.getElementById("ehoss").addEventListener("click", (e) => {
      filterMarkersByCategory("e622df28-65d3-11ee-98df-000c29627401");
      e.currentTarget.classList.add("e622df28-65d3-11ee-98df-000c29627401");



      const radioButtons = document.getElementsByName("catOption");
      radioButtons[3].checked = true;
      document.querySelector('.countyNameCat').innerHTML = `${radioButtons[3].value}`


      document.getElementById("all").classList.remove("all");
      document
        .getElementById("farm")
        .classList.remove("abcc76b0-4d5f-11ed-98da-000c29627401");
      document
        .getElementById("biogas")
        .classList.remove("a420f35e-65ce-11ee-98df-000c29627401");
      document
        .getElementById("cattle-farm")
        .classList.remove("d8ad09e8-65d3-11ee-98df-000c29627401");
    });
  }
  setupListeners();

  // const uniquePoints = {};

  // points.forEach((point) => {
  //   const key = `${point.areacity_latitude},${point.areacity_longitude}`;
  //   if (!uniquePoints[key]) {
  //     uniquePoints[key] = {
  //       point: point,
  //       category: point.category_guid,
  //       country: point.country_description,
  //       count: 1,
  //     };
  //   } else {
  //     uniquePoints[key].count++;
  //   }
  // });


  function handleSelectChange() {
    const radioButtons = document.getElementsByName("countryOption");

    let selectedCountry;

    radioButtons.forEach(radio => {
        if (radio.checked) {
            selectedCountry = radio.value;
        }
    });

    filterMapByCountry(selectedCountry, markers);
    console.log(selectedCountry);
    refreshSelectChange()
}


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




  document
    .getElementById("countrySelect")
    .addEventListener("change", handleSelectChange);



  // markers.forEach((marker) => {
  //   marker.setVisible(true);
  // });




}

document.querySelector(".header__menu-btn").addEventListener("click", () => {
  document.querySelector(".header__navbar").classList.toggle("active");
});


// document.querySelector('#openCat').addEventListener('click', (e) => {
//   document.querySelector('.cat-drop').classList.toggle('active');
//   e.target.classList.toggle('active');
// })

// let drop = document.querySelector('.cat-drop');


// drop.querySelectorAll('.cat-item').forEach((item) => {
//   item.addEventListener('click', () => {
//     document.querySelector('.cat-drop').classList.toggle('active');
//     document.querySelector('#openCat').classList.toggle('active');
//   })
// })


window.onload = () => {

  
 
  setTimeout(() => {
    document.querySelector('#radio1').click()
  }, 1000);

  setTimeout(() => {
    document.querySelector('.preloader__wrapper').classList.add('hidden');
    document.querySelector('#countrySelect').classList.remove('active');
    document.querySelector('#all').click();
  }, 1200)

}


let dropCat = document.querySelector('#categoriesDrop');


dropCat.querySelectorAll('.cat-item').forEach((item) => {
  item.addEventListener('click', () => {
    document.querySelector('.cat-drop').classList.toggle('active');
    refreshSelectChangeCategory()
  })
})

document.querySelector('#openCat').addEventListener('click', () => {
  document.querySelector('#openCat').classList.toggle('active')
  document.querySelector('#countrySelect').classList.remove('active')
})

document.querySelector('#openCount').addEventListener('click', () => {
  document.querySelector('#countrySelect').classList.toggle('active')
  document.querySelector('#openCat').classList.remove('active')
  document.querySelector('#openCat .cat-drop').classList.remove('active')
})

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
  document.querySelector('#countrySelect').classList.remove('active')
})





let RawData = "";

let NewPoints;

fetch("https://form.ehoss.com/get-data/rawdata")
  .then((response) => response.json())
  .then((data) => {
    RawData = data;
    console.log(data);

    // Вызов функции для обработки данных
    processData(RawData);
  })
  .catch((error) => console.error("Ошибка загрузки файла:", error));

function processData(data) {
  // Здесь вы можете выполнять нужные действия с данными
  console.log("Данные обработаны:", data);
  NewPoints = data;
  console.log(NewPoints);
}

let heatmap;
let heatmapInitialized = false;

function showHeatMap(RawData) {
  console.log(RawData);
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




document.querySelector('.heat').addEventListener('click', () => {
  showHeatMap(NewPoints);
  hideMarkers()
});