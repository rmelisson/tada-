var pressTimer

delete_element = function(list_name, element_name) {
	confirm('delete ' + list_name + ', '+ element_name + ' ?');
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
		},1000)
		return false;
	});

});
