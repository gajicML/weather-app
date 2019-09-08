activatePlacesSearch = () => {
    let inputs = $('.search_term');

    for(let i=0; i<inputs.length; i++) {
        let searchBox = new google.maps.places.SearchBox(inputs[i]);

        searchBox.addListener('places_changed', () => {
            const place = searchBox.getPlaces()[0];
            if (place === 0) return;
            const latitude = place.geometry.location.lat().toFixed(2);
            const longitude = place.geometry.location.lng().toFixed(2);

            if(inputs[i].getAttribute('data-val') == 0){
                $(".departure .lat").val(latitude);
                $(".departure .lon").val(longitude);
                getData(0);
            } else {
                $(".destination .lat").val(latitude);
                $(".destination .lon").val(longitude);
                getData(1);
            }
            
        })
    }
    
}