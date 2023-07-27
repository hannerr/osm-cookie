function onEachFeature(feature, layer) {
    
    if (feature.properties && feature.properties.titel && feature.properties.address && feature.properties.href) {
        layer.bindPopup(
            "<article class='card-popup'><img  src='"+ feature.properties.logo +"' height='120px' alt='"+ feature.properties.titel +"'><div><h3>"+ feature.properties.titel +"</h3><p>"+ feature.properties.address +"</p><a class='more' href='"+ feature.properties.href +"'>Mehr lesen</a></div><a href='"+ feature.properties.route +"'><img src='src/ico-map-route.svg' height='35px' width='35px' alt='route'></a></article>");//{closeButton: false});
            layer.on('mouseover', function() { layer.openPopup(); });
            //todo on mouseout vom popup?
            //layer.on('mouseout', function() { layer.closePopup(); });
    }
} 

function loadMap() {
    var L = window.L;
    const centerView = [46.82, 13.784];
    const svgIcon = L.divIcon({
        html: `
        <svg xmlns="http://www.w3.org/2000/svg" width="26.206" height="34.941" viewBox="0 0 26.206 34.941">
            <g id="ico_map-pin" transform="translate(23089.102 14942.471)">
                <path id="Pfad_100" data-name="Pfad 100" d="M13.1,0A13.135,13.135,0,0,0,0,13.166C0,24.619,13.1,34.941,13.1,34.941s13.1-10.693,13.1-21.775A13.134,13.134,0,0,0,13.1,0" transform="translate(-23089.102 -14942.471)" fill="#bf0000"/>
                <path id="Pfad_101" data-name="Pfad 101" d="M18.324,21.647a5.824,5.824,0,1,1,5.824-5.824,5.823,5.823,0,0,1-5.824,5.824" transform="translate(-23094.322 -14946.647)" fill="#fff"/>
            </g>
        </svg>`,
        className: "",
        iconSize: [22, 35]
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





