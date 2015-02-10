function datePick(){
	Alloy.createController("datePicker").getView().open();
}
$.later.on = function() {
		    this.backgroundColor = '#007690';
		    this.title='\u2713';
		    this.value = true;
		    $.displayDate.show();
		};
$.later.off = function() {
		    this.backgroundColor = '#aaa';
		    this.title='';
		    this.value = false;
		    $.displayDate.hide();
		};
		 
$.ready.on = function() {
		    this.backgroundColor = '#007690';
		    this.title='\u2713';
		    this.value = true;
		    $.displayDate.hide();
		};
$.ready.off = function() {
		    this.backgroundColor = '#aaa';
		    this.title='';
		    this.value = false;
		    $.displayDate.show();
		};
		 
		   
function datos(e, when, pickup, airport, home){
	var idClick = e.source.id || "";
	switch (idClick) {
		case "ready":
		datos.when = idClick;
		
		$.addresses.height = '65%';
		// $.scrollable.moveNext();
		if(false == e.source.value) {
		        e.source.on();
		        $.ready.touchEnabled = false;
		        $.later.touchEnabled = true;
		        $.later.off();
		       
		    } else {
		        e.source.off();
		        
		        $.later.on();
		    }
		break;
		
		case "later":
		datos.when = idClick;
		// $.scrollable.moveNext();
		$.addresses.height = '55%';
		if(false == e.source.value) {
		        e.source.on();
		        $.later.touchEnabled = false;
		        $.ready.touchEnabled = true;
		        $.ready.off();
		    } else {
		        e.source.off();
		        
		        $.ready.on();
		    }
		break;
		
		case "home":
		datos.pickup = idClick;
		$.addClass($.homePick, 'first');
		$.removeClass($.homePick, 'second');
		$.addClass($.airportPick, 'second');
		$.removeClass($.airportPick, 'first');
		$.scrollable.moveNext();
		break;
		
		case "airport":
		datos.pickup = idClick;
		$.addClass($.airportPick, 'first');
		$.removeClass($.airportPick, 'second');
		$.addClass($.homePick, 'second');
		$.removeClass($.homePick, 'first');
		$.scrollable.moveNext();
		break;
		
		case "aircode1":
		$.scrollable.moveNext();
		break;
		
		case "homecode1":
		$.scrollable.moveNext();
		break;
		
		case "confirmar":
		console.log(datos.when+ "," +datos.pickup);
		break;
	}
	
  // Alloy.createController("desde").getView().open();
}
$.index.open();

function checkEditDates(){
	if (Ti.App.Properties.getString('selectedDate') && Ti.App.Properties.getString('selectedTime')){
		$.edit.show();
		
	} else {
		$.edit.hide();
	}
}

function cleanDates() {
	if (Ti.App.Properties.getString('selectedDate')){
		Ti.App.Properties.removeProperty('selectedDate');	
	}
	$.later.on();
	$.later.touchEnabled = false;
	$.ready.off();
	$.ready.touchEnabled = true;
}
function getDates(){
	Ti.App.addEventListener('updateDate', function(data){
		Ti.API.info( "Date received from fireEvent = " + data.upDate );
		Ti.App.Properties.setString('selectedDate', data.upDate);
		$.dateSelected.text = Ti.App.Properties.getString('selectedDate');
		return;	  
	});
	Ti.App.addEventListener('updateTime', function(data){
	   Ti.API.info( "Time received from fireEvent = " + data.upDate );
	   Ti.App.Properties.setString('selectedTime', data.upDate);
	   $.timeSelected.text = Ti.App.Properties.getString('selectedTime');
	   return;
	});
	
}
var lat, lng, altitud;
var Map = require('ti.map');

var mapview = Map.createView({
	width:'100%',
	top:0,
	height: '100%',
	mapType: Map.NORMAL_TYPE,
	animate:true,
	regionFit:true,
	userLocation:true,
	visible: true,
	name: 'mapview',
	keepScreenOn: true,
});
$.map.add(mapview);

function NavRules(){
Ti.Geolocation.headingFilter = 10;

//ANDROID NAV
if(Ti.Platform.osname  ==  'android') {

   	Ti.Geolocation.Android.manualMode = true;
   	// modify only the gps
    var gpsProvider = Ti.Geolocation.Android.createLocationProvider({
        name: Ti.Geolocation.PROVIDER_GPS,
        minUpdateDistance: 0.0,
    	minUpdateTime: 0
    });
    Ti.Geolocation.Android.addLocationProvider(gpsProvider);
 
    //modify network
   	var networkProvider = Ti.Geolocation.Android.createLocationProvider({
	    name: Ti.Geolocation.PROVIDER_NETWORK,
	    minUpdateTime: 3, 
	    minUpdateDistance: 10
	});
	
	Ti.Geolocation.Android.addLocationProvider(networkProvider);
	
	//Declare location rules
	var gpsRule = Ti.Geolocation.Android.createLocationRule({
	    // NO PROVIDER SPECIFIED IN ORDER TO MAKE IT A GENERAL RULE FOR ALL PROVIDERS
	    provider: Ti.Geolocation.PROVIDER_GPS,
	    // Updates should be accurate to 100m
	    accuracy: 100,
	    // Updates should be no older than 30 seconds
	    maxAge: 5000,
	    // But  no more frequent than once per 10 seconds
	    minAge: 3000,
	});
	Ti.Geolocation.Android.addLocationRule(gpsRule);
	
	}
	
//IOS NAV
else {
    Ti.Geolocation.distanceFilter    =    10;
    Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
    Ti.Geolocation.accuracy    =    Ti.Geolocation.ACCURACY_BEST;
	}
}//END NavRules

NavRules();

function getLocation(){	   
		Titanium.Geolocation.getCurrentPosition(function(e){
			if (e.error || !e.success) {
        		console.log('getcurrentposition error');
        		return; 
    		}
    		if (e.success){
    		location_coords = e.coords;
    		var pin_inicio = Map.createAnnotation({
				latitude: e.coords.latitude,
				longitude: e.coords.longitude,
				title: "Ubicacion Inicial",
				pincolor: Map.ANNOTATION_YELLOW,
				animate:true,
				myid:1
			});
 			mapview.addAnnotation(pin_inicio);
    		}
			var region={
				latitude: e.coords.latitude,
				longitude: e.coords.longitude,
				animate:true,
				latitudeDelta:0.002,
				longitudeDelta:0.002
			};
			mapview.setRegion(region);
			
		});	
}//END FUNCTION GEOLOCATION

getLocation();



mapview.addEventListener('regionchanged', function(evt) {

    Titanium.Geolocation.reverseGeocoder(evt.latitude,evt.longitude,function(dir)
        {
            direccion = dir.places;
            
            Ti.API.info("reverse geolocation result = "+JSON.stringify(dir));
 			address = direccion[0].address.split(",");
 			if (address.length < 9){
 				address.unshift("-");
 			};
 			
 			street = direccion[0].street1;
 			local = address[0];
 			sector = address[2];
 			barrio = address[3];
 			ciudad = address[4];
 			
 			console.log(street, sector, barrio, ciudad, local);		
        
  		});	
});

// $.scrollable.scrollingEnabled = false;
//Attach some simple on/off actions

 
