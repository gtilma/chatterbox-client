var app = {};

app.init = function() {
	this.server = "https://api.parse.com/1/classes/chatterbox",
	this.contentType = "application/json"
}

app.init();
//format messages as needed, also update styles.css
//display messages received from server
//use $.ajax to get everything from https://api.parse.com/1/classes/chatterbox
app.fetch = function(room) {
  var roomQuery = ''
  if (room) {
    roomQuery = '&where={"roomname":"'+room+'"}'
  }

	$.ajax({
		url: app.server + '?order=-createdAt&limit=200'+roomQuery,
		type: "GET",
		contentType: app.contentType,
		success: function(data) {
      // can we add spam handling here?
      for (var i = 0; i < data.results.length; i++) {
        // console.log(data.results[i])
        //function(message) {
        if (data.results[i].hasOwnProperty("text")) {data.results[i].text = String(data.results[i].text).replace(/</g, "&lt;").replace(/>/g, "&gt;")}
        if (data.results[i].hasOwnProperty("roomname")) {data.results[i].roomname = String(data.results[i].roomname).replace(/</g, "&lt;").replace(/>/g, "&gt;")}
        if (data.results[i].hasOwnProperty("username")) {data.results[i].username = String(data.results[i].username).replace(/</g, "&lt;").replace(/>/g, "&gt;")}
        addToRoom(data.results[i]);
        // var room = data.results[i].roomname;
        // if (!roomList.hasOwnProperty(room)) {
        //   updateRoomList(room);
        // }
      }
      console.log(data)
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
			console.log("success");
      app.fetch(message.roomname);
		},
		error: function() {
			console.log("error")
		}
	});
}

	//probably have to parse the ajax somehow
	//sanitize?

app.addRoom = function() {
  var roomName = $("#newRoomName").val();
  if($('#roomSelect option[name="'+roomName+'"]').length === 0) {
    $("#roomSelect").append('<option name="'+roomName+'">'+roomName+'</option>');
    $("#roomSelect").val(roomName);
    $("#newRoomName").val('');
  }
};

app.clearMessages = function() {
  $('#chats').html('');
};

app.addMessage = function () {
  var message = {};
  message.roomname = $('#roomSelect option:selected').val();
  message.text = $('#messageEntry').val();
  message.username = $('#messageName').val();
  app.send(message);
};

// var friends = [];

app.addFriend = function (friend) {
  //friends.push(friend);
  $(friend).addClass('friend');
};

//add messages to index.html, probably with append or prepend
var addToRoom = function (message) {
  var box = $(document.createElement('div'));
  box.addClass('message');
  box.html('<span class="username">' + message.username + '</span> : ' + message.text);

  if ($("#"+message.roomname).length === 0) {
    var newRoom = $(document.createElement('div'));
    newRoom.attr('id',message.roomname);
    newRoom.attr('class','room');
    $('#chats').append(newRoom);
    if($('#roomSelect option[name="'+message.roomname+'"]').length === 0) {
      $("#roomSelect").append('<option name="'+message.roomname+'">'+message.roomname+'</option>');
    }
  } 

  $('#'+message.roomname).append(box);
  // TODO : add timestamp
  // TODO : add to pertinent room
};

$(document).on('ready', function() {
  app.fetch();

  $('#roomSelect').on('change', function() {
    var roomName = $('#roomSelect').val();
    app.clearMessages();
    app.fetch(roomName);
    $('.room').hide();
    $('#' + roomName).show();
  });

  $("#send").on('click',function() {
    app.addMessage();
    app.clearMessages();
  });

  $("#refresh").on('click', function() {
    var selectedRoom = $('#roomSelect').val();
    app.clearMessages();
    app.fetch(selectedRoom);
  });

  $("#addRoom").on('click', app.addRoom());

  $(document).on('click', '.username', function() {
    app.addFriend($(this));
  });

  $(document).on('hover', '.username', function(e) {
    $(e.target).addClass('maybeFriend');
  });
});


// clearing messages from DOM (on refresh?)

//   Test specs
// app.addFriend = checking .username
// allow users to friend each other
  // Display all messages sent by friends in bold

// app.handleSubmit = triggering $('#send .submit')
  
// prettification (CSS)

// ====== DONE =======
// app.addMessage = checking #chats.children
// app.addRoom = checking #roomSelect
// app.clearMessages  = clearing #chats.children

// button/input to create new room
  // add room to dropdown list
  // when list switches, show/hide rooms as appropriate
  // apply room name to inputs, and place messages in appropriate room
  // when adding a room, update room list & add new message container
  // loop through data & check for message container div (update list if !exists container)

//apply escaping to inputs
  // sanitize on send as well as fetch

//refreshing messages - probably use a button
  //either all messages from that time, or next 10

//allow users to select username
  //apply username to all messages/inputs from that username
