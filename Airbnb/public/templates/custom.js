function initialize() {
    
    var myLatLng = new google.maps.LatLng( 50, 50 ),
        myOptions = {
            zoom: 4,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            },
        map = new google.maps.Map( document.getElementById( 'map-canvas' ), myOptions ),
        marker = new google.maps.Marker( {position: myLatLng, map: map, draggable: true} );
    
    marker.setMap( map );
    moveMarker( map, marker );
    
}

function moveMarker( map, marker ) {
    
    //delayed so you can see it move
    setTimeout( function(){ 
    
        marker.setPosition( new google.maps.LatLng( 0, 0 ) );
        map.panTo( new google.maps.LatLng( 0, 0 ) );
        
    }, 1500 );

};

initialize();

