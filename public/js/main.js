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
		console.log( "user input left" );
		socket.emit( "go", "left" ); 	  // method .emit sends data to the socket
	};

	var right = function() {
		console.log( "user input right" );
		socket.emit( "go", "right" );
	};

	var slow = function() {
		console.log( "user input slow" );
		socket.emit( "go", "slow" );
	};

	var stop = function() {
		console.log( "user input stop" );
		socket.emit( "go", "stop" );
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
		socket.emit( "userInput", text );
	} );


} );
