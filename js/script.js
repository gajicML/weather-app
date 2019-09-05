$( document ).ready(() => {

	async function getWeather() {
	  let response = await fetch(`https://api.met.no/weatherapi/locationforecast/1.9/?lat=44.7;lon=17.1`);
	  let str = await response.text()
	  return str;
	}

	showData = (place) => {
        let latitude = "";
        let longitude = "";

        if(place == 0){
            latitude = $(".departure .lat").val();
            longitude = $(".departure .lon").val();
        } else {
            latitude = $(".destination .lat").val();
            longitude = $(".destination .lon").val();
        }

        getWeather(longitude, latitude)
        .then(str => $.parseXML(str))
        .then(data => {
            doTheWork(data, place)
        })
    };

    doTheWork = (data, place) => {
        const workData = data.querySelectorAll("[datatype=forecast]")[0].childNodes[1];

        const props = workData.childNodes;

        for(let i=0; i<props.length; i++){
            if(props[i].nodeName != '#text'){
                switch(props[i].nodeName){
                    case "temperature":
                        document.getElementsByClassName("temperature")[place].innerHTML = props[i].getAttributeNode('value').value;
                        break;

                    case "dewpointTemperature":
                        document.getElementsByClassName("dew")[place].innerHTML = props[i].getAttributeNode('value').value;
                        break;
                    
                    case "humidity":
                        document.getElementsByClassName("humidity")[place].innerHTML = props[i].getAttributeNode('value').value;
                        break;

                    case "fog":
                        document.getElementsByClassName("fog")[place].innerHTML = props[i].getAttributeNode('percent').value;
                        break;

                    case "lowClouds":
                        document.getElementsByClassName("low")[place].innerHTML = props[i].getAttributeNode('percent').value;
                        break;

                    case "mediumClouds":
                        document.getElementsByClassName("mid")[place].innerHTML = props[i].getAttributeNode('percent').value;
                        break;

                    case "highClouds":
                        document.getElementsByClassName("high")[place].innerHTML = props[i].getAttributeNode('percent').value;
                        break;
                }
            }
            
        }


    }

});
