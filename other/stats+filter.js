// Ваш ключ API Google Maps
const apiKey = "AIzaSyD0OYZfnj8uXou0tfCNNyxxkuLpX9MABDQ";
let points = "";
let stats = {};


fetch("emap.json") // Загружаем файл emap.json с помощью fetch
  .then((response) => response.json()) // Преобразуем ответ в формат JSON
  .then((data) => {
    points = data;

    setTimeout(initMap(), 1000);
    setTimeout(GetCountryFilter(points), 1000);
  // Генерируем статистику
  generateStats(points);

  })
  .catch((error) => console.error("Ошибка загрузки файла:", error));


  function generateStatsByCountry(filteredMarkers) {
    const stats = {};
  
    filteredMarkers.forEach((marker) => {
      const category = marker.category;
  
      // Создаем запись для категории, если её еще нет
      if (!stats[category]) {
        stats[category] = 1;
      } else {
        stats[category]++;
      }
    });
  
    return stats;
  }


  function updateStats(stats) {
    // Выводим статистику в консоль
    for (const key in stats) {
      console.log(`${key}: ${stats[key]}`);
    }
    
    const sum = Object.values(stats).reduce((total, value) => total + value, 0);

    console.log(stats);
    document.querySelector('#all span').innerHTML = sum;
    document.querySelector('#farm span').innerHTML = stats['abcc76b0-4d5f-11ed-98da-000c29627401']
    document.querySelector('#biogas span').innerHTML = stats['a420f35e-65ce-11ee-98df-000c29627401']
    document.querySelector('#cattle-farm span').innerHTML = stats['d8ad09e8-65d3-11ee-98df-000c29627401']
    document.querySelector('#ehoss span').innerHTML = stats['e622df28-65d3-11ee-98df-000c29627401']

  }



  function generateStats(points) {
    stats = {};

    console.log(stats);
  
    points.forEach((point) => {
      const country = point.country_description;
      const category = point.category_mapdescription;
  
      // Создаем запись для страны, если её еще нет
      if (!stats[country]) {
        stats[country] = 1;
      } else {
        stats[country]++;
      }
  
      // Создаем запись для категории, если её еще нет
      if (!stats[category]) {
        stats[category] = 1;
      } else {
        stats[category]++;
      }
    });
  
    // Выводим статистику в консоль
    for (const key in stats) {
      console.log(`${key}: ${stats[key]}`);
    }

    document.querySelector('#all span').innerHTML = points.length;
    document.querySelector('#farm span').innerHTML = stats['Stable']
    document.querySelector('#biogas span').innerHTML = stats['Biogas producer']
    document.querySelector('#cattle-farm span').innerHTML = stats['Cattle farm']
    document.querySelector('#ehoss span').innerHTML = stats['EHOSS']
  }






function GetCountryFilter(points) {
  const uniqueCountries = {}; // Объект для хранения уникальных стран

  // console.log("Все страны:");

  points.forEach((point) => {
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
    return (
      index ===
      self.findIndex((p) => p.country_description === point.country_description)
    );
  });

  console.log("Массив без дубликатов:", uniqueCountriesWithoutDuble);
}

function addCountryOptions(uniqueCountries) {
  const selectElement = document.getElementById("countrySelect");

  // Очищаем существующие опции
  // selectElement.innerHTML = "";

  // Добавляем уникальные страны в выпадающий список
  Object.keys(uniqueCountries).forEach((country) => {
    const option = document.createElement("option");
    option.value = country; // Приводим страну к нижнему регистру (если нужно)
    option.textContent = country;
    selectElement.appendChild(option);
  });
}

function initMap() {
  // function filterMarkersByCategory(categoryGuid) {




  //   markers.forEach((marker) => {
  //     if (
  //       marker.point.category_guid === categoryGuid ||
  //       categoryGuid === "all"
  //     ) {
  //       marker.setMap(map);
  //     } else {
  //       marker.setMap(null);
  //     }
  //   });
  // }

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

  const map = new google.maps.Map(document.getElementById("map"), {
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
    const selectedCountry = document.getElementById("countrySelect").value;

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
    // Пересчет показателей только при выборе страны
    const stats = generateStatsByCountry(filteredMarkers);
    updateStats(stats);
  
  }

  filterMarkersByCategory('all')

  filterMapByCountry('default', markers)













  function setupListeners() {
    // События на кликк all
    document.getElementById("all").addEventListener("click", (e) => {
      filterMarkersByCategory("all");
      e.currentTarget.classList.add("all");
    

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
    const selectedCountry = document.getElementById("countrySelect").value;
    filterMapByCountry(selectedCountry, markers);
  
    console.log(selectedCountry);
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
