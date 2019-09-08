$( document ).ready(() => {

    //get data from weather api
    async function getWeather(lon, lat) {
        let response = await fetch(`https://api.met.no/weatherapi/locationforecast/1.9/?lat=${lat};lon=${lon}`);
        let str = await response.text()
        return str;
    }

    $(".showData").click((e) => {
        
        let place = $(e.currentTarget).data('val');
        
        (place == 0) ? $('.departure .search_term').val("") : $('.destination .search_term').val("");

        getData(place);
    });

    getData = (place) => {
        let latitude = "";
        let longitude = "";

        if(place == 0){
            latitude = $(".departure .lat").val();
            longitude = $(".departure .lon").val();
        } else {
            latitude = $(".destination .lat").val();
            longitude = $(".destination .lon").val() ;
        }

        //check latitude and longitude range  
        if(!checkRange(latitude, longitude)) return false;
        
        getWeather(longitude, latitude)
        .then(str => $.parseXML(str))
        .then(data => {
            displayData(data, place);
            getPlaceByCoordinates(longitude, latitude, place);
        })
    } 

    displayData = (data, place) => {
        const workData = data.querySelectorAll("[datatype=forecast]")[0].childNodes[1];
        const props = workData.childNodes;

        for(let i=0; i<props.length; i++){
            if(props[i].nodeName != '#text'){
                switch(props[i].nodeName){
                    case "temperature":
                        document.getElementsByClassName("temperature")[place].textContent = props[i].getAttributeNode('value').value + '°';
                        break;

                    case "dewpointTemperature":
                        document.getElementsByClassName("dew")[place].textContent = props[i].getAttributeNode('value').value + ' °C';
                        break;
                    
                    case "humidity":
                        document.getElementsByClassName("humidity")[place].textContent = props[i].getAttributeNode('value').value + '%';
                        break;

                    case "fog":
                        document.getElementsByClassName("fog")[place].textContent = props[i].getAttributeNode('percent').value + '%';

                        showClouds(props[i].getAttributeNode('percent').value, 'fog', place);
                        break;

                    case "lowClouds":
                        document.getElementsByClassName("low")[place].textContent = props[i].getAttributeNode('percent').value + '%';
                        showClouds(props[i].getAttributeNode('percent').value, 'low', place);
                        break;

                    case "mediumClouds":
                        document.getElementsByClassName("mid")[place].textContent = props[i].getAttributeNode('percent').value + '%';
                        showClouds(props[i].getAttributeNode('percent').value, 'mid', place);
                        break;

                    case "highClouds":
                        document.getElementsByClassName("high")[place].textContent = props[i].getAttributeNode('percent').value + '%';
                        showClouds(props[i].getAttributeNode('percent').value, 'high', place);
                        break;
                }
            }
            
        }


    }

    showClouds = (value, prop, place) => {
        value = parseInt(value);
        let img = $(`.${prop}_img`)[place];
        
        if(value > 20 && value < 50) {
            img.src = `images/${prop}2.jpg`;
            return;
        } else if(value >= 50) {
            img.src = `images/${prop}1.jpg`;
            return;
        } else{
            img.src = `images/${prop}3.jpg`;
        }
    }

    getPlaceByCoordinates = (lon, lat, place) =>  {
        let apiKey = "AIzaSyCRuSEmC-fMgn152bKxklOL9Y_cVJkzG0I";
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // check if there is value in search input
            let searchValue = document.getElementsByClassName('search_term')[place].value;

            if(searchValue != ""){
                document.getElementsByClassName('city')[place].innerHTML = searchValue;
            } else {
                document.getElementsByClassName('city')[place].innerHTML = data.results[0].formatted_address;
            }
            
        })
    }

    //allow just valid range for longitude and latitude
    checkRange = (latitude, longitude) => {
        if(latitude == ""){
            showModal('Latitude field cannot be empty');
            return false;
        } else if(longitude == ""){
            showModal('Longitude field cannot be empty')
            return false;
        }

        latitude = parseFloat(latitude);
        longitude = parseFloat(longitude);
        
        if(latitude >= 80 || latitude <= -80){
            showModal("Latitude range must be from -79.9 to 79.9")
            return false;
        }
        if(longitude >= 180 || longitude <= -180){
            showModal("Longitude range must be from -179.9 to 179.9")
            return false;
        }
        
        return true;
    }

    let modal = document.getElementById("myModal");
    let span = document.getElementsByClassName("close")[0];
    let message = document.getElementById("message");

    showModal = (text) => {
        modal.style.display = "block";
        message.textContent = text
    }

    span.onclick = () =>  {
        modal.style.display = "none";
    }

    window.onclick = (event) =>  {
        if (event.target == modal)  modal.style.display = "none";
    }
    
});


