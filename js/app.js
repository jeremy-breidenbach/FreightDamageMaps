var app = new Vue({
    el: '#app',
    data: {
        carrier: 'ALL',
        isClustered: true,
        filteredDamageLocations: DamageLocations,
    },
    methods: {
        getCarriers: function(carrier) {
            if(carrier === 'ALL') {
                this.filteredDamageLocations = DamageLocations;
            } else {
                this.filteredDamageLocations = DamageLocations.filter(function(e) {
                    return e.carrier === carrier;
                });
            }
            this.initializeMap();
        },
        initializeMap: function() {
            var myCenter=new google.maps.LatLng(37.0842, -94.5131);
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


            for (var i = 0; i < this.filteredDamageLocations.length; i++) {
                var ClaimMarker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(this.filteredDamageLocations[i].lat, this.filteredDamageLocations[i].lng),
                    title: this.filteredDamageLocations[i].title
                });

                oms.addMarker(ClaimMarker);
                if (this.isClustered) {
                    mc.addMarker(ClaimMarker);
                }
                markers.push(ClaimMarker);
            }
        },
    },
    mounted: function() {
        this.initializeMap();
    }
});
