var express = require("express")
var fs = require('fs');

// here we read data from the DB file
// set interval for saving
var data_file = __dirname + '/data/data.json';
try {
	var data = JSON.parse(fs.readFileSync(data_file, 'utf8'));
} catch (err) {
	console.log(err);
	return;
}
var update = false

save_if_update = function(){
	if (update) {
		fs.writeFileSync(data_file, JSON.stringify(data), 'utf8')
		update = false
		console.log('update found, saved at ' + (new Date()).toString())
	}
}

// we check for update and save it every 5 sec
setInterval(save_if_update, 5 * 1000);

// we backup the file every day
setInterval(save_if_update, 60*60*24*1000);

// here we create the server
// and set routes
var app = express.createServer() 
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.set('view options', { layout: 'layout' });
var pub = __dirname + '/public'
//app.use(express.compiler({ src: pub, enable: ['sass'] }));
app.use(express.static(pub));
app.use(express.bodyParser());

// here we define the functionnal concern
display_lists = function(req, res) {
	res.render('lists', {locals: {lists:data}});
}

display_elements = function(req, res) {
	list = get_list_from_name(req.params.list_name)
	res.render('elements', {locals: {list : list}});
}

get_list_from_name = function(name) {
	for (i=0;i<data.length;i++){
		if (data[i].name == name)
			return data[i]
	}
}

update_element = function(list_name, element_name){
	elements = get_list_from_name(list_name).elements
	for (i=0;i<elements.length;i++){
		if (elements[i].name == element_name){
			if (elements[i].done){
				elements[i].done = false
			}
			else {
				elements[i].done = true 
			}
			update = true
		}	
	}	
}

app.get('/', display_lists);

app.get('/see_list/:list_name', display_elements);

app.post('/add', function(req, res) {
	// we check that the name is a new one
	
	var new_list = {name : req.body.new_list_name, elements : []}
	data.push(new_list)
	update = true;
	display_lists(req,res)
});

app.post('/add_element/:list_name', function(req, res) {
	// check it doesn't exist

	var new_element = {name : req.body.new_element_name, done : false}
	var list = get_list_from_name(req.params.list_name)
	list.elements.push(new_element)
	update = true
	display_elements(req, res)
});

app.get('/delete_element/:list_name/:element_name', function(req, res) {
	var list = get_list_from_name(req.params.list_name)
	//list.
	console.log('delete ' + req.params.list_name + '/' + req.params.element_name)
	display_elements(req, res)
});

app.get('/update/:list_name/:element_name', function(req, res) {
	update_element(req.params.list_name, req.params.element_name)
	display_elements(req, res)
});

// and we start the server
var port = 8000;
app.listen(port);
console.log("Tada! started on port : " + port);
