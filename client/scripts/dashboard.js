function addBoard(uid) {
	let bname = document.getElementById("boardname").value;
	let desc = document.getElementById("desc").value;

	if (!bname && !desc) { return }
	
	const board = { bname: bname, desc: desc, uid: uid }

	var request = new XMLHttpRequest()

	request.open('POST', 'http://localhost:3000/addboard', true)
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.onloadend = function () {			
		if (request.status >= 200 && request.status < 400) {
			var data = JSON.parse(this.response)
			document.getElementById("lblmsg").innerHTML = bname + " added.";
		} else {
			document.getElementById("lblmsg").innerHTML = "Error Duplicate Name";
		}
	}
	request.send(JSON.stringify(board))
}

function addColumn(boardId) {
	let colName = document.getElementById("colname").value;

	if (!colName) { return }
	
	const column = { colname: colName, bid: boardId }

	var request = new XMLHttpRequest()

	request.open('POST', 'http://localhost:3000/addcolumns', true)
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.onloadend = function () {

		if (request.status >= 200 && request.status < 400) {
			var data = JSON.parse(this.response) 

			document.getElementById("lblmsg").innerHTML = data.colname + " added.";

		} else {

			console.log('error')
			document.getElementById("lblmsg").innerHTML = "Error in Column creation";
		}
	}
	request.send(JSON.stringify(column))
}

function addCard(colId) {
	let cardName = document.getElementById("cardname").value;

	if (!cardName) { return }
	//api call
	const card = { cardname: cardName, colid: colId }

	var request = new XMLHttpRequest()

	request.open('POST', 'http://localhost:3000/addcards', true)
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.onloadend = function () {
		if (request.status >= 200 && request.status < 400) {
			var data = JSON.parse(this.response) 
			document.getElementById("lblmsg").innerHTML = data.cardname + " added.";
		} else {			
			document.getElementById("lblmsg").innerHTML = "Error in Card creation";
		}
	}
	request.send(JSON.stringify(card))		
}