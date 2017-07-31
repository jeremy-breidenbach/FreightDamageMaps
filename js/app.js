var myCenter=new google.maps.LatLng(37.0842, -94.5131);
var TestLocation = {
    lat:44.9457588,
    lng:-90.3191299};
var TestMarker = new google.maps.LatLng(TestLocation.lat,TestLocation.lng);


function initialize() {
    var mapProp = {
        center:myCenter,
        zoom:5,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=new google.maps.Map(document.getElementById("googleMap")
    ,mapProp);

    var iw = new google.maps.InfoWindow();
    var oms = new OverlappingMarkerSpiderfier(map);
    var mcOptions = {maxZoom: 7};

    var markers = [];
    var mc = new MarkerClusterer(map, markers, mcOptions);


    var DamageLocations = AllDamageLocations;

    for (var i = 0; i < DamageLocations.length; i++) {
        var ClaimMarker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(DamageLocations[i].lat, DamageLocations[i].lng),
            title: DamageLocations[i].title
        });

        oms.addMarker(ClaimMarker);
        mc.addMarker(ClaimMarker);
        markers.push(ClaimMarker);
    }

}

google.maps.event.addDomListener(window, 'load', initialize);
