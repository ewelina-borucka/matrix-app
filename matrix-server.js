// -------------------------------------------------- //

var app = require("http").createServer(),
	io = require("socket.io").listen( app ),
	port = 8888,
	five = require("johnny-five");


var board = new five.Board();

board.on( "ready", function() {
	var matrix = new five.Led.Matrix( {
		pins: {
			data: 13,
			clock: 11,
			cs: 12
		},
		devices: 4
	});

  // -------------------------------------------------- //
	// Initialize matrix

	matrix.on(0);
	matrix.on(1);
	matrix.on(2);
	matrix.on(3);

	io.sockets.on( "connection", function( socket ) {
		console.log( "socket connected", socket.id );
		socket.on( "go", function( action ) {
			console.log( "Recived command from the socket:" + action );

// -------------------------------------------------- //
// Functions on user input

			switch ( action ) {
				case "left":
					matrix.draw("arrowleft");  	  // johnny-five/lib/led/led-chars.js
					break;
				case "right":
					matrix.draw("arrowright");    // by default .draw for all devices
					break;
				case "slow":
					matrix.device(0).draw("S"); // device(0).draw for the first board
					matrix.device(1).draw("L"); // 										the second etc..
					matrix.device(2).draw("O");
					matrix.device(3).draw("W");
					break;
				case "stop":
					matrix.device(0).draw("S");
					matrix.device(1).draw("T");
					matrix.device(2).draw("O");
					matrix.device(3).draw("P");
					break;
				case "yo":
					matrix.device(0).draw("y");
					matrix.device(1).draw("o");
					matrix.device(2).draw("!");
					matrix.device(3).draw("!");
					break;
				}
		});

		socket.on( "userInput", function( text ) {
			console.log( "Got a text over the socket:", text );

			if( text.length > 0 ) {
				var userString = text.split("");     // for the moment takes max 4 letters
				var maxStringLength = 4;
				matrix.clear();
				for (var i = 0; i < maxStringLength; i += 4) {
					matrix.device(0).draw(userString[i]);
					matrix.device(1).draw(userString[i + 1]);
					matrix.device(2).draw(userString[i + 2]);
					matrix.device(3).draw(userString[i + 3]);
				}
			}
		});

		socket.on("ledArt", function(binaryMap) {
			matrix.draw(binaryMap);
		});
	});


	board.repl.inject( {
		matrix1: matrix.device(0),
		matrix2: matrix.device(1),
		matrix3: matrix.device(2),
		matrix4: matrix.device(3),
		matrixAll: matrix
	});
});
console.log( "listening on port ", port );
app.listen( port );
