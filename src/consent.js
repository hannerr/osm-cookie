/*first consent*/
const consentOverlay = document.querySelector(".consent-overlay");
const acceptCookie = document.querySelector(".acceptCookie");
const rejectCookie = document.querySelector(".rejectCookie");
/*load leaflet.js after consent*/ 
function loadScript(url, callback)
{
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    script.onreadystatechange = callback;
    script.onload = callback;
    document.body.appendChild(script);
}
const leafleturl = "http://127.0.0.1:5500/osm_geojson_consent/leaflet/leaflet.js";

document.addEventListener("DOMContentLoaded", function() {
    if (document.cookie.length!=0) {
        consentOverlay.classList.remove("noconsent");
        rejectCookie.style.display= "block";
        loadScript(leafleturl, window.loadMap);
    }
})

acceptCookie.addEventListener("click", function() {
    document.cookie="osmcookie=1";
    consentOverlay.classList.remove("noconsent");
    rejectCookie.style.display= "block";
    loadScript(leafleturl, window.loadMap);
});

rejectCookie.addEventListener("click", function() {
    document.cookie= "osmcookie=0;max-age=0";  
    consentOverlay.classList.add("noconsent"); 
});

/*Hide and show the map*/ 
let mapcanvas = document.getElementById("map");
let overlay = document.querySelector(".overlay");
let btnhide = document.querySelector(".btn-hide");

function showMap() {
    overlay.classList.toggle("hide");
    mapcanvas.style.height= "760px";
    btnhide.style.display= "block";
}
function hideMap() {
    overlay.classList.toggle("hide");
    mapcanvas.style.height= "140px";
    btnhide.style.display= "none";
}