var args = arguments[0] || {};


function reportDate() {	
	var dateValue = new Date($.pickDay.value);
	
    Ti.API.info('User selected: ' +  dateValue);
    Ti.App.fireEvent('updateDate', {upDate: dateValue});
}

function reportTime() {
	var timeValue = new Date($.pickHour.value);
	
    Ti.API.info('User selected: ' +  timeValue);
    Ti.App.fireEvent('updateTime', {upDate: timeValue});

}
function checkTime(){
	var dateValue = new Date($.pickDay.value);
	var timeValue = new Date($.pickHour.value);
	
    Ti.API.info('Close corrected: ' +  timeValue);
    Ti.App.fireEvent('updateDate', {upDate: dateValue});
    Ti.App.fireEvent('updateTime', {upDate: timeValue});
}
function datosDate(){
	$.datePicker.close();
}

$.datePicker.open({modal: true});
//Git Test


