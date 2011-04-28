var pressTimer

delete_element = function(list_name, element_name) {
	if (confirm('delete ' + list_name + ', '+ element_name + ' ?')){
		//delete
//		try {
			window.location.replace(document.domain + "/delete_element/" + list_name + "/" + element_name);
			/*var xhr = new XMLHttpRequest();
			xhr.open("GET", "delete_element/" + list_name + "/" + element_name, true);
			xhr.send();
		} catch (e) {
			alert(e);
		}*/
	} 
}

$(document).ready(function(){
	$('#body').corner("20px");
	$('.lists').corner();
	$('.elements').corner();
	$('.new_name').corner("tl bl");
	$('.add_button').corner("tr br");
	$('.new_name').focus(function() {
		$('.new_name').attr('value', '');
	});

	$('.done').mouseup(function() {
		clearTimeout(pressTimer)
		return false;
	}).mousedown( function() {
		var element_name= $(this).children().html()
		var list_name= $('#list_title').html()

		pressTimer = window.setTimeout( function() {
			delete_element(list_name,element_name)
		},700)
		return false;
	});

});
