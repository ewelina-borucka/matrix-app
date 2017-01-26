// -------------------------------------------------- //
// Initialize socket connection

var socket = io.connect( "http://localhost:8888" );


$(function() {
	var btnLeft = $( "#left" ),
			btnRight = $( "#right" ),
			btnSlow = $( "#slow" ),
			btnStop = $( "#stop" ),
			userIput = $( "#text" ),
			btnText = $( "#btn-text" );


// -------------------------------------------------- //
// Define socket functions for the buttons

	var left = function() {
		console.log( "move left" );
		socket.emit( "move", "left" ); 	  // method .emit sends data to the socket
	};

	var right = function() {
		console.log( "move right" );
		socket.emit( "move", "right" );
	};

	var slow = function() {
		console.log( "move slow" );
		socket.emit( "move", "slow" );
	};

	var stop = function() {
		console.log( "move stop" );
		socket.emit( "move", "stop" );
	};

	btnLeft.on( "click", left );
	btnRight.on( "click", right );
	btnSlow.on( "click", slow );
	btnStop.on( "click", stop );


	// -------------------------------------------------- //
	// User input text area

	btnText.on( "click", function() {
		var text = userIput.val();
		console.log( text );
		socket.emit( "text", text );
	} );


} );
