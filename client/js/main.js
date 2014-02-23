	  var socket = io.connect('http://raspberrypi:8004');
	  var action = {
	      direction: 'stop'
	  };

	   //constants for car actions
	  var MOVE_FORWARD = 'forward',
	      MOVE_BACKWARD = 'backward',
	      STOP = 'stop';

	   //handler for keypress on the html page
	  $('html').keypress(function(e) {
	      var pressedKey = String.fromCharCode(e.keyCode).toUpperCase();
	      switch (pressedKey) {
	          case "W":
	              action.direction = MOVE_FORWARD;
	              break;
	          case "S":
	              action.direction = MOVE_BACKWARD;
	              break;
	      }
	      socket.emit('action', action);
	  });

	   //if released key was 'W' or 'S' then stop the car
	  $('html').keyup(function(e) {
	      var releasedKey = String.fromCharCode(e.keyCode).toUpperCase();
	      if (releasedKey == 'W' || releasedKey == "S") {
	          action.direction = STOP;
	          socket.emit('action', action)
	      }
	  })