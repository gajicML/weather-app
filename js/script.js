$( document ).ready(() => {

    async function getWeather(lon, lat) {
        let response = await fetch(`https://api.met.no/weatherapi/locationforecast/1.9/?lat=${lat};lon=${lon}`);
        let str = await response.text()
        return str;
    }

    $(".showData").click((e) => {
        let latitude = "";
        let longitude = "";
        
        let place = $(e.currentTarget).data('val');

        if(place == 0){
            latitude = $(".departure .lat").val();
            longitude = $(".departure .lon").val();
        } else {
            latitude = $(".destination .lat").val();
            longitude = $(".destination .lon").val();
        }

        if(!checkRange(latitude, longitude)) return false;
        
        getWeather(longitude, latitude)
        .then(str => $.parseXML(str))
        .then(data => {
            displayData(data, place)
        })
    });

    displayData = (data, place) => {
        const workData = data.querySelectorAll("[datatype=forecast]")[0].childNodes[1];

        const props = workData.childNodes;

        for(let i=0; i<props.length; i++){
            if(props[i].nodeName != '#text'){
                switch(props[i].nodeName){
                    case "temperature":
                        document.getElementsByClassName("temperature")[place].textContent = props[i].getAttributeNode('value').value;
                        break;

                    case "dewpointTemperature":
                        document.getElementsByClassName("dew")[place].textContent = props[i].getAttributeNode('value').value;
                        break;
                    
                    case "humidity":
                        document.getElementsByClassName("humidity")[place].textContent = props[i].getAttributeNode('value').value;
                        break;

                    case "fog":
                        document.getElementsByClassName("fog")[place].textContent = props[i].getAttributeNode('percent').value;
                        break;

                    case "lowClouds":
                        document.getElementsByClassName("low")[place].textContent = props[i].getAttributeNode('percent').value;
                        break;

                    case "mediumClouds":
                        document.getElementsByClassName("mid")[place].textContent = props[i].getAttributeNode('percent').value;
                        break;

                    case "highClouds":
                        document.getElementsByClassName("high")[place].textContent = props[i].getAttributeNode('percent').value;
                        break;
                }
            }
            
        }


    }

    checkRange = (latitude, longitude) => {
        if(latitude == ""){
            alert('Latitude field cannot be empty')
            return false;
        } else if(longitude == ""){
            alert('Longitude field cannot be empty')
            return false;
        }

        latitude = parseFloat(latitude);
        longitude = parseFloat(longitude);
        
        if(latitude >= 80 || latitude <= -80){
            alert("Latitude range must be from -80 to 80")
            return false;
        }
        if(longitude >= 180 || longitude <= -180){
            alert("Longitude range must be from -180 to 180")
            return false;
        }
        
        return true;
    }


});


