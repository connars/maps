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
          "color": "#FF0000"
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
    maxZoom: 10,

  });















  var slovakiaCoords = [
    { "lat": 49.085738, "lng": 22.558138 },
    { "lat": 49.087249, "lng": 22.280842 },
    { "lat": 49.076417, "lng": 21.872236 },
    { "lat": 49.232636, "lng": 21.662924 },
    { "lat": 49.470107, "lng": 21.099081 },
    { "lat": 49.431453, "lng": 20.415839 },
    { "lat": 49.217125, "lng": 19.825022 },
    { "lat": 49.435846, "lng": 19.320713 },
    { "lat": 49.328772, "lng": 18.909575 },
    { "lat": 49.496230, "lng": 18.853144 },
    { "lat": 49.494636, "lng": 18.392913 },
    { "lat": 49.494370, "lng": 18.331345 },
    { "lat": 49.043983, "lng": 18.170989 },
    { "lat": 48.636064, "lng": 17.558333 },
    { "lat": 48.318382, "lng": 16.879983 },
    { "lat": 48.334364, "lng": 16.499283 },
    { "lat": 48.470014, "lng": 16.340584 },
    { "lat": 48.596982, "lng": 16.267370 },
    { "lat": 48.800191, "lng": 16.011664 },
    { "lat": 48.902712, "lng": 16.108945 },
    { "lat": 48.996492, "lng": 16.576518 },
    { "lat": 48.997715, "lng": 17.101985 },
    { "lat": 48.733899, "lng": 17.220741 },
    { "lat": 48.367371, "lng": 17.604696 },
    { "lat": 48.202694, "lng": 17.997040 },
    { "lat": 47.758429, "lng": 18.859558 },
    { "lat": 47.688159, "lng": 19.165249 },
    { "lat": 47.880953, "lng": 19.401239 },
    { "lat": 48.081768, "lng": 19.732192 },
    { "lat": 48.455410, "lng": 20.373882 },
    { "lat": 48.601056, "lng": 20.778267 },
    { "lat": 48.562850, "lng": 21.680425 },
    { "lat": 48.422264, "lng": 22.085608 },
    { "lat": 48.684511, "lng": 22.280842 },
    { "lat": 49.085738, "lng": 22.558138 }
];

var kosiceRegionCoords = [
  { lat: 48.8167, lng: 21.2611 },
  { lat: 48.9041, lng: 21.1677 },
  { lat: 49.0220, lng: 21.1843 },
  { lat: 49.0448, lng: 21.3439 },
  { lat: 49.1210, lng: 21.5150 },
  { lat: 49.1590, lng: 21.6073 },
  { lat: 49.2199, lng: 21.6736 },
  { lat: 49.2594, lng: 21.8145 },
  { lat: 49.2716, lng: 21.9406 },
  { lat: 49.2903, lng: 22.0850 },
  { lat: 49.2408, lng: 22.1461 },
  { lat: 49.1829, lng: 22.1697 },
  { lat: 49.1424, lng: 22.1674 },
  { lat: 49.0908, lng: 22.1993 },
  { lat: 49.0567, lng: 22.1982 },
  { lat: 49.0280, lng: 22.1605 },
  { lat: 48.9887, lng: 22.1493 },
  { lat: 48.9416, lng: 22.1178 },
  { lat: 48.8998, lng: 22.0889 },
  { lat: 48.8561, lng: 22.0632 },
  { lat: 48.8066, lng: 22.0170 },
  { lat: 48.7603, lng: 21.9925 },
  { lat: 48.7125, lng: 21.9873 },
  { lat: 48.6619, lng: 21.9645 },
  { lat: 48.6194, lng: 21.9317 },
  { lat: 48.5807, lng: 21.9112 },
  { lat: 48.5388, lng: 21.8827 },
  { lat: 48.4978, lng: 21.8528 },
  { lat: 48.4507, lng: 21.8270 },
  { lat: 48.4108, lng: 21.7981 },
  { lat: 48.3771, lng: 21.7618 },
  { lat: 48.3392, lng: 21.7229 },
  { lat: 48.3052, lng: 21.6913 },
  { lat: 48.2694, lng: 21.6547 },
  { lat: 48.2391, lng: 21.6206 },
  { lat: 48.2047, lng: 21.5851 },
  { lat: 48.1702, lng: 21.5442 },
  { lat: 48.1374, lng: 21.5056 },
  { lat: 48.1018, lng: 21.4672 },
  { lat: 48.0703, lng: 21.4274 },
  { lat: 48.0344, lng: 21.3921 },
  { lat: 48.0028, lng: 21.3553 },
  { lat: 47.9698, lng: 21.3202 },
  { lat: 47.9350, lng: 21.2866 },
  { lat: 47.9034, lng: 21.2510 },
  { lat: 47.8707, lng: 21.2160 },
  { lat: 47.8384, lng: 21.1816 },
  { lat: 47.8041, lng: 21.1485 },
  { lat: 47.7705, lng: 21.1142 },
  { lat: 47.7387, lng: 21.0806 },
  { lat: 47.7068, lng: 21.0469 },
  { lat: 47.6728, lng: 21.0142 },
  { lat: 47.6402, lng: 20.9806 },
  { lat: 47.6063, lng: 20.9484 },
  { lat: 47.5731, lng: 20.9149 },
  { lat: 47.5402, lng: 20.8830 },
  { lat: 47.5088, lng: 20.8497 },
  { lat: 47.4755, lng: 20.8174 },
  { lat: 47.4442, lng: 20.7838 },
  { lat: 47.4110, lng: 20.7525 },
  { lat: 47.3804, lng: 20.7198 },
  { lat: 47.3476, lng: 20.6874 },
  { lat: 47.3171, lng: 20.6553 },
  { lat: 47.2855, lng: 20.6230 },
  { lat: 47.2551, lng: 20.5909 },
  { lat: 47.2226, lng: 20.5584 },
  { lat: 47.1911, lng: 20.5261 },
  { lat: 47.1591, lng: 20.4935 },
  { lat: 47.1271, lng: 20.4609 },
  { lat: 47.0958, lng: 20.4285 },
  { lat: 47.0644, lng: 20.3959 },
  { lat: 47.0327, lng: 20.3644 },
  { lat: 47.0014, lng: 20.3318 },
  { lat: 46.9697, lng: 20.3004 },
  { lat: 46.9380, lng: 20.2681 },
  { lat: 46.9054, lng: 20.2358 },
  { lat: 46.8741, lng: 20.2042 },
  { lat: 46.8419, lng: 20.1721 },
  { lat: 46.8101, lng: 20.1406 },
  { lat: 46.7788, lng: 20.1079 },
  { lat: 46.7462, lng: 20.0767 },
  { lat: 46.7145, lng: 20.0453 },
  { lat: 46.6827, lng: 20.0128 },
  { lat: 46.6509, lng: 19.9811 },
  { lat: 46.6193, lng: 19.9487 },
  { lat: 46.5872, lng: 19.9169 },
  { lat: 46.5558, lng: 19.8845 },
  { lat: 46.5241, lng: 19.8521 },
  { lat: 46.4915, lng: 19.8196 },
  { lat: 46.4599, lng: 19.7874 },
  { lat: 46.4282, lng: 19.7547 },
  { lat: 46.3964, lng: 19.7230 },
  { lat: 46.3646, lng: 19.6904 },
  { lat: 46.3330, lng: 19.6578 },
  { lat: 46.3013, lng: 19.6254 },
  { lat: 46.2694, lng: 19.5935 },
  { lat: 46.2380, lng: 19.5607 },
  { lat: 46.2064, lng: 19.5285 },
  { lat: 46.1747, lng: 19.4961 },
  { lat: 46.1425, lng: 19.4635 },
  { lat: 46.1109, lng: 19.4311 },
  { lat: 46.0792, lng: 19.3987 },
  { lat: 46.0477, lng: 19.3661 },
  { lat: 46.0158, lng: 19.3336 },
  { lat: 45.9839, lng: 19.3011 },
  { lat: 45.9521, lng: 19.2686 },
  { lat: 45.9205, lng: 19.2359 },
  { lat: 45.8884, lng: 19.2033 },
  { lat: 45.8568, lng: 19.1711 },
  { lat: 45.8251, lng: 19.1385 },
  { lat: 45.7935, lng: 19.1060 },
  { lat: 45.7619, lng: 19.0735 },
  { lat: 45.7303, lng: 19.0410 },
  { lat: 45.6985, lng: 19.0085 },
  { lat: 45.6667, lng: 18.9760 },
  { lat: 45.6351, lng: 18.9435 },
  { lat: 45.6034, lng: 18.9109 },
  { lat: 45.5718, lng: 18.8783 },
  { lat: 45.5401, lng: 18.8457 },
  { lat: 45.5084, lng: 18.8131 },
  { lat: 45.4767, lng: 18.7805 },
  { lat: 45.4451, lng: 18.7479 },
  { lat: 45.4134, lng: 18.7153 },
  { lat: 45.3817, lng: 18.6827 },
  { lat: 45.3499, lng: 18.6502 },
  { lat: 45.3183, lng: 18.6176 },
  { lat: 45.2866, lng: 18.5850 },
  { lat: 45.2549, lng: 18.5524 },
  { lat: 45.2232, lng: 18.5198 },
  { lat: 45.1915, lng: 18.4872 },
  { lat: 45.1598, lng: 18.4546 },
  { lat: 45.1281, lng: 18.4220 },
  { lat: 45.0965, lng: 18.3894 },
  { lat: 45.0648, lng: 18.3568 },
  { lat: 45.0331, lng: 18.3242 },
  { lat: 45.0014, lng: 18.2916 },
  { lat: 44.9697, lng: 18.2590 },
  { lat: 44.9380, lng: 18.2264 },
  { lat: 44.9063, lng: 18.1938 },
  { lat: 44.8746, lng: 18.1612 },
  { lat: 44.8429, lng: 18.1286 },
  { lat: 44.8112, lng: 18.0960 },
  { lat: 44.7795, lng: 18.0634 },
  { lat: 44.7478, lng: 18.0308 },
  { lat: 44.7161, lng: 17.9982 },
  { lat: 44.6844, lng: 17.9656 },
  { lat: 44.6527, lng: 17.9330 },
  { lat: 44.6210, lng: 17.9004 },
  { lat: 44.5893, lng: 17.8678 },
  { lat: 44.5576, lng: 17.8352 },
  { lat: 44.5259, lng: 17.8026 },
  { lat: 44.4942, lng: 17.7700 },
  { lat: 44.4625, lng: 17.7374 },
  { lat: 44.4308, lng: 17.7048 },
  { lat: 44.3991, lng: 17.6722 },
  { lat: 44.3674, lng: 17.6396 },
  { lat: 44.3357, lng: 17.6070 },
  { lat: 44.3040, lng: 17.5744 },
  { lat: 44.2723, lng: 17.5418 },
  { lat: 44.2406, lng: 17.5092 },
  { lat: 44.2089, lng: 17.4766 },
  { lat: 44.1772, lng: 17.4440 },
  { lat: 44.1455, lng: 17.4114 },
  { lat: 44.1138, lng: 17.3788 },
  { lat: 44.0821, lng: 17.3462 },
  { lat: 44.0504, lng: 17.3136 },
  { lat: 44.0187, lng: 17.2810 },
  { lat: 43.9870, lng: 17.2484 },
  { lat: 43.9553, lng: 17.2158 },
  { lat: 43.9236, lng: 17.1832 },
  { lat: 43.8919, lng: 17.1506 },
  { lat: 43.8602, lng: 17.1180 },
  { lat: 43.8285, lng: 17.0854 },
  { lat: 43.7968, lng: 17.0528 },
  { lat: 43.7651, lng: 17.0202 },
  { lat: 43.7334, lng: 16.9876 },
  { lat: 43.7017, lng: 16.9550 },
  { lat: 43.6700, lng: 16.9224 },
  { lat: 43.6383, lng: 16.8898 },
  { lat: 43.6066, lng: 16.8572 },
  { lat: 43.5749, lng: 16.8246 },
  { lat: 43.5432, lng: 16.7920 },
  { lat: 43.5115, lng: 16.7594 },
  { lat: 43.4798, lng: 16.7268 },
  { lat: 43.4481, lng: 16.6942 },
  { lat: 43.4164, lng: 16.6616 },
  { lat: 43.3847, lng: 16.6290 },
  { lat: 43.3530, lng: 16.5964 },
  { lat: 43.3213, lng: 16.5638 },
  { lat: 43.2896, lng: 16.5312 },
  { lat: 43.2579, lng: 16.4986 },
  { lat: 43.2262, lng: 16.4660 },
  { lat: 43.1945, lng: 16.4334 },
  { lat: 43.1628, lng: 16.4008 },
  { lat: 43.1311, lng: 16.3682 },
  { lat: 43.0994, lng: 16.3356 },
  { lat: 43.0677, lng: 16.3030 },
  { lat: 43.0360, lng: 16.2704 },
  { lat: 43.0043, lng: 16.2378 },
  { lat: 42.9726, lng: 16.2052 },
  { lat: 42.9409, lng: 16.1726 },
  { lat: 42.9092, lng: 16.1400 },
  { lat: 42.8775, lng: 16.1074 },
  { lat: 42.8458, lng: 16.0748 },
  { lat: 42.8141, lng: 16.0422 },
  { lat: 42.7824, lng: 16.0096 },
  { lat: 42.7507, lng: 15.9770 },
  { lat: 42.7190, lng: 15.9444 },
  { lat: 42.6873, lng: 15.9118 },
  { lat: 42.6556, lng: 15.8792 },
  { lat: 42.6239, lng: 15.8466 },
  { lat: 42.5922, lng: 15.8140 },
  { lat: 42.5605, lng: 15.7814 },
  { lat: 42.5288, lng: 15.7488 },
  { lat: 42.4971, lng: 15.7162 },
  { lat: 42.4654, lng: 15.6836 },
  { lat: 42.4337, lng: 15.6510 },
  { lat: 42.4020, lng: 15.6184 },
  { lat: 42.3703, lng: 15.5858 },
  { lat: 42.3386, lng: 15.5532 },
  { lat: 42.3069, lng: 15.5206 },
  { lat: 42.2752, lng: 15.4880 },
  { lat: 42.2435, lng: 15.4554 },
  { lat: 42.2118, lng: 15.4228 },
  { lat: 42.1801, lng: 15.3902 },
  { lat: 42.1484, lng: 15.3576 },
  { lat: 42.1167, lng: 15.3250 },
  { lat: 42.0850, lng: 15.2924 },
  { lat: 42.0533, lng: 15.2598 },
  { lat: 42.0216, lng: 15.2272 },
  { lat: 41.9899, lng: 15.1946 },
  { lat: 41.9582, lng: 15.1620 },
  { lat: 41.9265, lng: 15.1294 },
  { lat: 41.8948, lng: 15.0968 },
  { lat: 41.8631, lng: 15.0642 },
  { lat: 41.8314, lng: 15.0316 },
  { lat: 41.7997, lng: 14.9990 },
  { lat: 41.7680, lng: 14.9664 },
  { lat: 41.7363, lng: 14.9338 },
  { lat: 41.7046, lng: 14.9012 },
  { lat: 41.6729, lng: 14.8686 },
  { lat: 41.6412, lng: 14.8360 },
  { lat: 41.6095, lng: 14.8034 },
  { lat: 41.5778, lng: 14.7708 },
  { lat: 41.5461, lng: 14.7382 },
  { lat: 41.5144, lng: 14.7056 },
  { lat: 41.4827, lng: 14.6730 },
  { lat: 41.4510, lng: 14.6404 },
  { lat: 41.4193, lng: 14.6078 },
  { lat: 41.3876, lng: 14.5752 },
  { lat: 41.3559, lng: 14.5426 },
  { lat: 41.3242, lng: 14.5100 },
  { lat: 41.2925, lng: 14.4774 },
  { lat: 41.2608, lng: 14.4448 },
  { lat: 41.2291, lng: 14.4122 },
  { lat: 41.1974, lng: 14.3796 },
  { lat: 41.1657, lng: 14.3470 },
  { lat: 41.1340, lng: 14.3144 },
  { lat: 41.1023, lng: 14.2818 },
  { lat: 41.0706, lng: 14.2492 },
  { lat: 41.0389, lng: 14.2166 },
  { lat: 41.0072, lng: 14.1840 },
  { lat: 40.9755, lng: 14.1514 },
  { lat: 40.9438, lng: 14.1188 },
  { lat: 40.9121, lng: 14.0862 },
  { lat: 40.8804, lng: 14.0536 },
  { lat: 40.8487, lng: 14.0210 },
  { lat: 40.8170, lng: 13.9884 },
  { lat: 40.7853, lng: 13.9558 },
  { lat: 40.7536, lng: 13.9232 },
  { lat: 40.7219, lng: 13.8906 },
  { lat: 40.6902, lng: 13.8580 },
  { lat: 40.6585, lng: 13.8254 },
  { lat: 40.6268, lng: 13.7928 },
  { lat: 40.5951, lng: 13.7602 },
  { lat: 40.5634, lng: 13.7276 },
  { lat: 40.5317, lng: 13.6950 },
  { lat: 40.5000, lng: 13.6624 }
];


  var slovakiaPolygon = new google.maps.Polygon({
    paths: slovakiaCoords,
    strokeColor: '#FF0000', 
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000', 
    fillOpacity: 0.35
  });

  slovakiaPolygon.setMap(map);

// Вычисление центра полигона
function getPolygonCenter(coords) {
    var bounds = new google.maps.LatLngBounds();
    coords.forEach(function(coord) {
        bounds.extend(new google.maps.LatLng(coord.lat, coord.lng));
    });
    return bounds.getCenter();
}

var center = getPolygonCenter(slovakiaCoords);

// Создание окна информации
var infoWindow = new google.maps.InfoWindow({
    content: 
    `<div class='zone_info'>
      <p>
        >1k
      </p>
    </div>`
});

// Добавление обработчика события для полигона
google.maps.event.addListener(slovakiaPolygon, 'click', function() {
    infoWindow.setPosition(center);
    infoWindow.open(map);
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

      // Пример функцции, которая маппит маркеры на карту и создаёт карточки для каждого маркера


      document.querySelector('.pixel').addEventListener('click', () => {
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
        address: point.address,
        name: point.description,
        url: point.rawdata_a,
      });


      // console.log(point.guid);


      let base64Image = [];
      let infowindow = new google.maps.InfoWindow({ content: ``, });

      marker.addListener('click', () => {
        // getImageByGuid(point.guid).then((data) => {
        // base64Image = data;
        // console.log(data);

        // Проверяем, есть ли изображения
        // if (base64Image.length > 0) {

        document.querySelector('.sidebar').classList.add('open');
        document.querySelector('.item-info-wrapper')
          .innerHTML =
          `<div class='infocard'>
            <div class='infowin-contant'>
              
              <h2 class='font-medium text-[22px] mb-2'>
              ${point.description}
              </h2>
              Address: ${point.address}

              <a class='bg-white mt-4 block rounded-2xl text-center text-[13px] p-2 text-black' href="https://${point.description}" target="_blank">Open website</a>
          </div>`

        // } else {
        //   document.querySelector('.sidebar').classList.add('open');

        // infowindow = new google.maps.InfoWindow({
        //   content: `<div class='infowin'>
        //   <div class='infowin-contant'>
        //     <a style="color: red" href="https://${point.description}" target="_blank">${point.description}</a><br><br>
        //     Address: ${point.address}
        //   </div>`,
        // });
        // }


        //   infowindow.open(map, marker); 
        // })
        // .catch((error) => {
        //   console.error("Ошибка загрузки изображения:", error);
        // });
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



  // function mapMarkersToCards(markers) {
  //   const itemInfoWrapper = document.querySelector('.item-info-wrapper');
  //   console.log(markers);
  //   const markerCardsHTML = markers.map((point) => {
  //     return `
  //       <div class='infocard'>
  //         <div class='infowin-content'>
  //           <h2 class='font-medium text-[22px] mb-2'>
  //           ${point.name}
  //           </h2>
  //           Адрес: ${point.address}

  //           <div class='flex gap-2 mt-2'>
  //             <a href='https://${point.name}' class='block h-6 w-6 rounded-full'>
  //               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  //                 <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
  //               </svg>
  //             </a>
  //             <!-- <div class='h-6 w-6 rounded-full icon-class'>
  //               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  //                 <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  //                 <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  //               </svg> -->
  //             </div>
  //           </div>

  //         </div>
  //       </div>
  //     `;
  //   }).join(''); 
  //   itemInfoWrapper.innerHTML = markerCardsHTML;
  // }












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
    // mapMarkersToCards(filteredMarkers)
    markerCluster = new MarkerClusterer(map, filteredMarkers, clusterOptions); // Создаем новые кластеры с отфильтрованными маркерами
  }

  function hideClusters() {
    markerCluster.clearMarkers();
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

    // mapMarkersToCards(filteredMarkers)
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
    var heatMapData = RawData.filter(function (point) {
      return point.ispublicdata === 1;
    })
      .map(function (point) {
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




