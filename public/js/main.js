// -------------------------------------------------- //
// Board generate
var size = 8;

$(function() { //on load
    printBoard(size);
    printBoard(size);
    printBoard(size);
    printBoard(size);
});

function printBoard(size) {
    var maxRow = parseInt(size);
    var maxCol = parseInt(size);

    var myTable = $("<table></table>").appendTo("#board");
    for (var row = maxRow - 1; row >= 0; row--) {
        var myRow = $("<tr></tr>").appendTo(myTable);
        for (var col = 0; col < maxCol; col++) {
            myRow.append("<td></td>");
        }
    }
}

// -------------------------------------------------- //
// Initialize socket connection

var socket = io.connect( "http://localhost:8888" );


$(function() {
	var btnLeft = $("#left"),
			btnRight = $("#right"),
			btnSlow = $("#slow"),
			btnYo = $("#yo"),
			btnStop = $("#stop"),
			userIput = $("#text"),
			btnText = $("#btn-text"),

			btnSmile = $("#smile"),
			btnBall = $("#ball"),
			btnTongueout = $("#tongueout"),
			btnWinkright = $("#winkright"),
			btnSpeaker = $("#speaker"),
			btnDonut = $("#donut"),
			btnAngryface = $("#angryface"),
			btnBlink = $("#blink");


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

	var yo = function() {
		console.log( "user input yo" );
		socket.emit( "go", "yo" );
	};

	var smile = function () {
		socket.emit( "ledArt", emoji.smile );
	};

	var ball = function () {
		socket.emit( "ledArt", emoji.ball );
	};

	var tongueout = function () {
		socket.emit( "ledArt", emoji.tongueout );
	};

	var winkright = function () {
		socket.emit( "ledArt", emoji.winkright );
	};

	var speaker = function () {
		socket.emit( "ledArt", emoji.speaker );
	};

	var donut = function () {
		socket.emit( "ledArt", emoji.donut );
	};

	var angryface = function () {
		socket.emit( "ledArt", emoji.angryface );
	};

	var blink = function () {
		socket.emit( "ledArt", emoji.blink );
	};

	btnLeft.on( "click", left );
	btnRight.on( "click", right );
	btnSlow.on( "click", slow );
	btnStop.on( "click", stop );
	btnYo.on( "click", yo);

	btnSmile.on("click", smile);
	btnBall.on("click", ball);
	btnTongueout.on("click", tongueout);
	btnWinkright.on("click", winkright);
	btnSpeaker.on("click", speaker);
	btnDonut.on("click", donut);
	btnAngryface.on("click", angryface);
	btnBlink.on("click", blink);

	// -------------------------------------------------- //
	// User input text area

	btnText.on( "click", function() {
		var text = userIput.val();
		console.log( text );
		socket.emit( "userInput", text );
	} );

	// -------------------------------------------------- //
	// User input buttons emoji




} );
