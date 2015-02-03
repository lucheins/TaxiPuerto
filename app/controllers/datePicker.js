var args = arguments[0] || {};


function reportDate(date) {
	
	var dateValue = $.pickDay.value;
	var day = dateValue.getDate();
    date.day = day.toString();
    var month = dateValue.getMonth() + 1;
    date.month = month.toString();
    var year = dateValue.getFullYear();
    date.year = year.toString();
	
    Ti.API.info('User selected: ' + day, month, year);
    Ti.App.Properties.setString('day', date.day);
    Ti.App.Properties.setString('month', date.month);
    Ti.App.Properties.setString('year', date.year);
}
//commit
function getDate(date){
	var day = Ti.App.Properties.getString('day');
	var month = Ti.App.Properties.getString('month');
	var year = Ti.App.Properties.getString('year');
	
	if (day || month || day){
		$.pickDay.value = new Date(year,month - 1,day);
	} else {
	
	var dateValue = $.pickDay.value;
	var day = dateValue.getDate();
    date.day = day.toString();
    var month = dateValue.getMonth() + 1;
    date.month = month.toString();
    var year = dateValue.getFullYear();
    date.year = year.toString();
	
    Ti.API.info('User selected: ' + day, month, year);
    Ti.App.Properties.setString('day', date.day);
    Ti.App.Properties.setString('month', date.month);
    Ti.App.Properties.setString('year', date.year);
   }
}
function reportTime() {
	
	var hourValue = $.pickHour.value;
	var hour = hourValue.getHours();
    hour = hour.toString();
    var minute = hourValue.getMinutes();
    minute = minute.toString();
    
    Ti.API.info('User selected: ' + hour, minute);    
    Ti.App.Properties.setString('hour', hour);
    Ti.App.Properties.setString('minute', minute);

}
function times() {
		var hourValue = $.pickHour.value;
		var hour = hourValue.getHours();
	    hour = hour.toString();
	    var minute = hourValue.getMinutes();
	    minute = minute.toString();
	    
	    
	    Ti.App.Properties.setString('hour', hour);
	    Ti.App.Properties.setString('minute', minute);
}

function getTime(){
	var hour = Ti.App.Properties.getString('hour');
	var minute = Ti.App.Properties.getString('minute');
	
	if (hour || minute){
	var value = new Date();
	value.setMinutes(minute);
	value.setHours(hour);
	
	$.pickHour.value = value;
	
	}
}
function datosDate(){
	$.datePicker.close();
}

$.datePicker.open({modal: true});


