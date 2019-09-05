$( document ).ready(() => {

	async function getWeather() {
	  let response = await fetch(`https://api.met.no/weatherapi/locationforecast/1.9/?lat=44.7;lon=17.1`);
	  let str = await response.text()
	  return str;
	}

	getWeather()
        .then(str => $.parseXML(str))
        .then(data => {
            const workData = data.querySelectorAll("[datatype=forecast]")[0].childNodes[1];
            console.log(workData);

            const props = workData.childNodes;
            console.log(props);
    
            for(let i=0; i<props.length; i++){
                console.log(props[i].nodeName);
                if(props[i].nodeName != '#text'){
                    switch(props[i].nodeName){
                        case "temperature":
                            document.getElementById("temperature").innerHTML = props[i].attributes[2].nodeValue;
                            break;

                        case "dewpointTemperature":
                            document.getElementById("dew").innerHTML = props[i].attributes[2].nodeValue;
                            break;
                        
                        case "humidity":
                            document.getElementById("humidity").innerHTML = props[i].attributes[0].nodeValue;
                            break;

                        case "fog":
                            document.getElementById("fog").innerHTML = props[i].attributes[1].nodeValue;
                            break;

                        case "lowClouds":
                            document.getElementById("low").innerHTML = props[i].attributes[1].nodeValue;
                            break;

                        case "mediumClouds":
                            document.getElementById("mid").innerHTML = props[i].attributes[1].nodeValue;
                            break;

                        case "highClouds":
                            document.getElementById("high").innerHTML = props[i].attributes[1].nodeValue;
                            break;
                    }
                }
                
            }
          
    
        })

});
