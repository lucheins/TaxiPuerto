var args = arguments[0] || {};

function setDatePicker (){
	if (Ti.App.Properties.getString('selectedDate')){
		var selectedDate = Ti.App.Properties.getString('selectedDate').split(",");
			$.pickDay.value = new Date(selectedDate[0],selectedDate[1],selectedDate[2]);		
	}
	if (Ti.App.Properties.getString('selectedTime')){
		var selectedTime = Ti.App.Properties.getString('selectedTime').split(",");
			$.pickerCustom.setSelectedRow(0, selectedTime[0]-1, true);
			$.pickerCustom2.setSelectedRow(0, selectedTime[1]-1, true);
			$.pickerCustom3.setSelectedRow(0, selectedTime[2]-1, true);
	}	 
}
function setTimePicker (){
	if (Ti.App.Properties.getString('selectedTime')){
		console.log(Ti.App.Properties.getString('selectedTime'));
	}
}
function reportDate() {	
	var dateValue = new Date($.pickDay.value);
	var month = dateValue.getMonth();
	var day = dateValue.getDate();
	var year = dateValue.getFullYear();
	var fecha = year+","+month+","+day;
	
	var picker = $.pickerCustom;
	var picker2 = $.pickerCustom2;
	var picker3 = $.pickerCustom3;
	var hora = picker.getSelectedRow(0).value+","+picker2.getSelectedRow(0).value+","+picker3.getSelectedRow(0).value;
	
	Ti.App.fireEvent('updateTime', {upDate: hora});
    Ti.App.fireEvent('updateDate', {upDate: fecha});
}
function today(){
	var date = new Date();
	$.pickDay.value = date;
}

function datosDate(){
	var date = new Date();
	var d  = date.getDate();
	var day = (d < 10) ? '0' + d : d;
	var m = date.getMonth() + 1;
	var month = (m < 10) ? '0' + m : m;
	var yy = date.getYear();
	var year = (yy < 1000) ? yy + 1900 : yy;
	    date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
	
	var dateValue = new Date($.pickDay.value);
        dateValue.setSeconds(01);
	console.log("la de hoy: "+date);
	console.log("la de seleccionada: "+dateValue);
	
	if (dateValue <= date){
		alert("La fecha seleccionada es invalida. Por favor escoge una fecha no menor a la de hoy: "+year + "/" + month + "/" + day);
		return;
	}
	
	reportDate();
	$.datePicker.close();
}

$.datePicker.open({modal: true});



