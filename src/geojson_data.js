function onEachFeature(feature, layer) {
    
    if (feature.properties && feature.properties.titel && feature.properties.address && feature.properties.href) {
        layer.bindPopup(
            "<article class='card-popup'><img  src='"+ feature.properties.logo +"' height='120px' alt='"+ feature.properties.titel +"'><div><h3>"+ feature.properties.titel +"</h3><p>"+ feature.properties.address +"</p><a class='more' href='"+ feature.properties.href +"'>Mehr lesen</a></div><a href='"+ feature.properties.route +"'><img src='src/ico-map-route.svg' height='35px' width='35px' alt='route'></a></article>");
            layer.on('mouseover', function() { layer.openPopup(); });
            //todo on mouseout vom popup?
            //layer.on('mouseout', function() { layer.closePopup(); });
    }
} 

function loadMap() {
    var L = window.L;
    //set the center view with data-center-view attribute
    let mapCenter = document.querySelector("#map");
    let centerView = JSON.parse(mapCenter.dataset.centerView);

    const svgIcon = L.icon({
        iconUrl: 'src/ico_pin_red.svg',
        iconSize: [26, 35]
        });

    const geojsonData = {
        type: "FeatureCollection",
        features: [
        {
            type: "Feature",
            properties: {
                logo: "src/logo.png",
                titel: "Musikschule Drautal",
                address: "Adresse",
                href: "www.bla.com",
                route: "www.bla.com",
            },
            geometry: {
                coordinates: [13.539471093254207, 46.90841165916723],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                logo: "src/logo.png",
                titel: "Musikschule 2",
                address: "Adresse",
                href: "www.bla.com",
                route: "www.bla.com",
            },
            geometry: {
                coordinates: [13.177835682209576, 46.74865403072545],
                type: "Point"
            }
        },
        {
            type: "Feature",
            properties: {
                logo: "src/logo.png",
                titel: "Musikschule Mölltal",
                address: "Adresse",
                href: "www.bla.com",
                route: "www.bla.com",
            },
            geometry: {
                coordinates: [12.880286658895699, 46.86846266752249],
                type: "Point"
            }
        }
        ]
    };
    const map = L.map("map").setView(centerView, 9);

    const tiles = L.tileLayer(
        //todo karte in grau?
        //https://github.com/Zverik/leaflet-grayscale
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
        maxZoom: 19,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
    ).addTo(map);
    L.geoJSON(geojsonData, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: svgIcon});
        }
    }).addTo(map);
    
}
window.loadMap = loadMap;
