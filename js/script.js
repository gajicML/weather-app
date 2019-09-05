$( document ).ready(() => {

	async function getWeather() {
	  let response = await fetch(`https://api.met.no/weatherapi/locationforecast/1.9/?lat=44.7;lon=17.1`);
	  let str = await response.text()
	  return str;
	}

	getWeather()
	    .then(str => $.parseXML(str))
	    .then(data => {
	        console.log(data);
    })

});
