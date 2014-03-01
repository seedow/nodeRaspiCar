	  var socket = io.connect('http://raspberrypi:8004');
	  var action = {
	      direction: 'stop'
	  };

	   //constants for car actions
	  var MOVE_FORWARD = 'forward',
	      MOVE_BACKWARD = 'backward',
	      STOP = 'stop';


	   //TODO: unify handlers for actions

	   //click handlers for buttons
	  $('document').ready(function() {

	      $('#controls button').on('mousedown press', function() {
	          var keypress = $.Event('keypress');
	          switch (this.id) {
	              case MOVE_FORWARD:
	                  // 119 = 'W'
	                  keypress.keyCode = 119;
	                  break;
	              case MOVE_BACKWARD:
	                  // 83 = 'S'
	                  keypress.keyCode = 83;
	                  break;
	          }
	          $('html').trigger(keypress);
	      });

	      $('#controls button').on('mouseup release', function() {
	          var keyup = $.Event('keyup');
	          // 83 = 'S'
	          keyup.keyCode = 83;
	          $('html').trigger(keyup);
	      })
	  })


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