// YOUR CODE HERE:
var app = {};

app.init = function() {
	this.url = "https://api.parse.com/1/classes/chatterbox",
	this.contentType = "application/json"
}

app.init();
//format messages as needed, also update styles.css

//display messages received from server
//use $.ajax to get everything from https://api.parse.com/1/classes/chatterbox
app.fetch = function(username) {
	$.ajax({
		url: app.url,
		type: "GET",
		//data: JSON.stringify(message),
		contentType: app.contentType,
		success: function(data) {
			//$("#main").append(JSON.stringify(data));
			console.log(data);
		},
		error: function() {
			console.log("error")
		}
	});
};

app.send = function(message) {
//send messages to parse server with post request
	$.ajax({
		// data: message,
		url: app.url,
		type: "POST",
		data: JSON.stringify(message),
		contentType: app.contentType,
		success: function() {

			console.log("success")
		},
		error: function() {
			console.log("error")
		}
	});	
}

	//probably have to parse the ajax somehow
	//sanitize?
	//add messages to index.html, probably with append or prepend

//refreshing messages - probably use a button
	//either all messages from that time, or next 10

//apply escaping to inputs
	//something on keyup - use preventDefault to avoid <,/,], etc.?

//allow users to select username
	//apply username to all messages/inputs from that username

//button/input to create new room
	//add room to dropdown list
	//when list switches, show/hide rooms as appropriate
	//apply room name to inputs, and place messages in appropriate room