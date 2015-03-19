// $(document).ready(function() {
  var app = {};

  app.init = function() {
  	this.server = "https://api.parse.com/1/classes/chatterbox",
  	this.contentType = "application/json"
  }

  app.init();
  //format messages as needed, also update styles.css
  //display messages received from server
  //use $.ajax to get everything from https://api.parse.com/1/classes/chatterbox
  app.fetch = function() {
  	$.ajax({
  		url: app.server + '?order=-createdAt',
  		type: "GET",
  		contentType: app.contentType,
  		success: function(data) {
        //sanitize
        for (var i = 0; i < data.results.length; i++) {
          //console.log(data.results[i])
          //function(message) {
          if (data.results[i].hasOwnProperty("text")) {data.results[i].text = data.results[i].text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
          if (data.results[i].hasOwnProperty("roomname")) {data.results[i].roomname = data.results[i].roomname.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
          if (data.results[i].hasOwnProperty("username")) {data.results[i].username = data.results[i].username.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
          addToRoom(data.results[i]);
          // var room = data.results[i].roomname;
          // if (!roomList.hasOwnProperty(room)) {
          //   updateRoomList(room);
          // }
        }
  		},
  		error: function() {
  			console.log("error")
  		}
  	});
  };

  app.send = function(message) {
  //send messages to parse server with post request
  	$.ajax({
  		url: app.server,
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
  var addToRoom = function (message) {
    var box = $(document.createElement('div'));
    box.addClass('message');
    box.html(message.username + ': ' + message.text);
    $('body').append(box);
    // TODO : add timestamp
    // TODO : add to pertinent room
  };

  $(document).on('click', '#submitMessage', function() {
    var message = {};
    message.roomname = $('#roomMenu option:selected').val();
    message.text = $('#messageEntry').val();
    message.username = $('#messageName').val();
    app.send(message);
    addToRoom(message);
  });

  $(document).on('click', '#refresh', function() {
    app.fetch();
  });
// });

//button/input to create new room
  //add room to dropdown list
  //when list switches, show/hide rooms as appropriate
  //apply room name to inputs, and place messages in appropriate room
  // when adding a room, update room list & add new message container
  // loop through data & check for message container div (update list if !exists container)

//prettification (CSS)

//refreshing messages - probably use a button
  //either all messages from that time, or next 10

//apply escaping to inputs
  // sanitize on send as well as fetch

//allow users to select username
  //apply username to all messages/inputs from that username
