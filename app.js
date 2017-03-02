//make BMI Calculator

$(document).ready(function(){

var xpos=0;
var ypos=0;


// Get Location Map
// -------------------------


var x = document.getElementById("demo");

// $("#btn").click(function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
// });

function showPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;

    xpos=position.coords.latitude;
    ypos=position.coords.longitude;

    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=16&size=400x300&sensor=false&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU";
    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";


		getValuepos(xpos, ypos);
	$("#city,#country,#temp,#sunny,#icon,#unit,#label-1,#label-2,#update,#forecast1,#forecast2,#forecast3,#forecast4,#forecast5,#forecast6,#forecast7,.unit1").css("visibility", "visible");

 
}
//To use this code on your website, get a free API key from Google.
//Read more at: https://www.w3schools.com/graphics/google_maps_basic.asp

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}




// Get Temperature info
// ------------------------------

	// $("#btn").click(function(){

	// 	alert(ypos);
	// 	var city_name = $("#cityname").val();
	// 	// getValue(city_name);
	// 	getValue(xpos, ypos);
	// 	$("#city,#country,#temp,#sunny,#icon,#unit").css("visibility", "visible");
	// });



	function getValuepos(xpos, ypos){


		$.ajax({
			url: 'https://api.apixu.com/v1/current.json?key=fd48aae7884d4ddcbf192605171202&q='+xpos+','+ypos,
			dataType: 'json',
			success: function(data){
				// console.log(data);

				$("#city").text(data.location.name);
				$("#country").text(data.location.country);
				$("#temp").text(data.current.temp_c);
				$("#sunny").text(data.current.condition.text);

				// image=data.current.condition.icon;
				var str = data.current.condition.icon;
				str = str.replace("//", "https://");
				$("#icon").attr("src", str);				
			}
		});



		// Forecast currentl location temperature
		// --------------------------------------

		$.ajax({
			url: 'https://api.apixu.com/v1/forecast.json?key=fd48aae7884d4ddcbf192605171202&q='+xpos+','+ypos+'&days=7',
			dataType: 'json',
			success: function(value){
				// console.log(data);

				// $("#city").text(value.location.name);
				// $("#country").text(value.location.country);
				$("#region").text(value.location.tz_id);

				$("#update").text(value.current.last_updated);

				// for (var i = 0; i <7; i++) {

					var temp1=value.forecast.forecastday[0].day.maxtemp_c;
					var date1=value.forecast.forecastday[0].date;

					var temp2=value.forecast.forecastday[1].day.maxtemp_c;
					var date2=value.forecast.forecastday[1].date;

					var temp3=value.forecast.forecastday[2].day.maxtemp_c;
					var date3=value.forecast.forecastday[2].date;

					var temp4=value.forecast.forecastday[3].day.maxtemp_c;
					var date4=value.forecast.forecastday[3].date;

					var temp5=value.forecast.forecastday[4].day.maxtemp_c;
					var date5=value.forecast.forecastday[4].date;

					var temp6=value.forecast.forecastday[5].day.maxtemp_c;
					var date6=value.forecast.forecastday[5].date;

					var temp7=value.forecast.forecastday[6].day.maxtemp_c;
					var date7=value.forecast.forecastday[6].date;


					$("#forecast1").text(date1+": "+temp1);
					$("#forecast2").text(date2+": "+temp2);
					$("#forecast3").text(date3+": "+temp3);
					$("#forecast4").text(date4+": "+temp4);
					$("#forecast5").text(date5+": "+temp5);
					$("#forecast6").text(date6+": "+temp6);
					$("#forecast7").text(date7+": "+temp7);
				// }

			}
		});


	}
	



// Get Temperature info
// ------------------------------

	$("#find").click(function(){

		// alert(ypos);
		var city_name = $("#cityname").val();
		getValue(city_name);
		// getValue(xpos, ypos);
		$("#city,#country,#temp,#sunny,#icon,#unit,#label-1,#label-2,#update,#forecast1,#forecast2,#forecast3,#forecast4,#forecast5,#forecast6,#forecast7,.unit1").css("visibility", "visible");
	});

	function getValue(city){

		$.ajax({
			url: 'https://api.apixu.com/v1/current.json?key=fd48aae7884d4ddcbf192605171202&q='+city,
			dataType: 'json',
			success: function(data){
				// console.log(data);

				$("#city").text(data.location.name);
				$("#country").text(data.location.country);
				$("#temp").text(data.current.temp_c);
				$("#sunny").text(data.current.condition.text);

				// image=data.current.condition.icon;
				var str = data.current.condition.icon;
				str = str.replace("//", "https://");
				$("#icon").attr("src", str);				

			var lat = data.location.lat;
			var lon = data.location.lon;

			var latlon = lat + "," + lon;
			var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&sensor=false&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU";
    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";

			}
		});



		// Forecast
		// --------------
		$.ajax({
			url: 'https://api.apixu.com/v1/forecast.json?key=fd48aae7884d4ddcbf192605171202&q='+city+'&days=7',
			dataType: 'json',
			success: function(value){
				// console.log(data);

				// $("#city").text(value.location.name);
				// $("#country").text(value.location.country);
				$("#region").text(value.location.tz_id);

				$("#update").text(value.current.last_updated);

				// for (var i = 0; i <7; i++) {

					var temp1=value.forecast.forecastday[0].day.maxtemp_c;
					var date1=value.forecast.forecastday[0].date;

					var temp2=value.forecast.forecastday[1].day.maxtemp_c;
					var date2=value.forecast.forecastday[1].date;

					var temp3=value.forecast.forecastday[2].day.maxtemp_c;
					var date3=value.forecast.forecastday[2].date;

					var temp4=value.forecast.forecastday[3].day.maxtemp_c;
					var date4=value.forecast.forecastday[3].date;

					var temp5=value.forecast.forecastday[4].day.maxtemp_c;
					var date5=value.forecast.forecastday[4].date;

					var temp6=value.forecast.forecastday[5].day.maxtemp_c;
					var date6=value.forecast.forecastday[5].date;

					var temp7=value.forecast.forecastday[6].day.maxtemp_c;
					var date7=value.forecast.forecastday[6].date;


					$("#forecast1").text(date1+": "+temp1);
					$("#forecast2").text(date2+": "+temp2);
					$("#forecast3").text(date3+": "+temp3);
					$("#forecast4").text(date4+": "+temp4);
					$("#forecast5").text(date5+": "+temp5);
					$("#forecast6").text(date6+": "+temp6);
					$("#forecast7").text(date7+": "+temp7);
				// }

			}
		});

	}



});
