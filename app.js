//make BMI Calculator

$(document).ready(function(){

var xpos=0;
var ypos=0;

	// window.setTimeout(function, milliseconds);


// Get Location Map
// -------------------------


var x = document.getElementById("demo");
// ()
$("#btn").click(function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
});

function showPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;

    xpos=position.coords.latitude;
    ypos=position.coords.longitude;

    // alert(ypos);

    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&sensor=false&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU";
    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";


		getValuepos(xpos, ypos);
		$("#city,#country,#temp,#sunny,#icon,#unit").css("visibility", "visible");

     // 	x.innerHTML = "Latitude: " + xpos + 
    	// "<br>Longitude: " + ypos;

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
		// alert(xpos);
	// var x = document.getElementById("demo");

	// function showPosition(position) {
 //    // x.innerHTML = "Latitude: " + position.coords.latitude + 
 //    // "<br>Longitude: " + position.coords.longitude;

 //     x.innerHTML = "Latitude: " + xpos + 
 //    "<br>Longitude: " + ypos;
	// }



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
	}
	



// Get Temperature info
// ------------------------------

	$("#find").click(function(){

		// alert(ypos);
		var city_name = $("#cityname").val();
		getValue(city_name);
		// getValue(xpos, ypos);
		$("#city,#country,#temp,#sunny,#icon,#unit").css("visibility", "visible");
	});



	// function getValue(xpos, ypos){
		// alert(xpos);
	// var x = document.getElementById("demo");

	// function showPosition(position) {
 //    // x.innerHTML = "Latitude: " + position.coords.latitude + 
 //    // "<br>Longitude: " + position.coords.longitude;

 //     x.innerHTML = "Latitude: " + xpos + 
 //    "<br>Longitude: " + ypos;
	// }

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
	}



});
