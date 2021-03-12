function showPreview() {
	const urlParams = new URLSearchParams(window.location.search);
	const uid = urlParams.get('uid');

	const loggeduser = { uid: uid }

	var request = new XMLHttpRequest()

	request.open('POST', 'http://localhost:3000/showboards', true)
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.onloadend = function () {

		if (request.status >= 200 && request.status < 400) {
			var boardData = JSON.parse(this.response) //json.parse()		

			boardData.map((board) => {
				displayBoard(board)
			})
		} else {
			document.getElementById("previewbox").innerHTML = "Error Fetch";
		}
	}
	request.send(JSON.stringify(loggeduser))

	showSharing();
}

function showSharing() {
	const urlParams = new URLSearchParams(window.location.search);
	const uid = urlParams.get('uid');

	const loggeduser = { uid: uid }

	var request = new XMLHttpRequest()

	request.open('POST', 'http://localhost:3000/showsharing', true)
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.onloadend = function () {

		if (request.status >= 200 && request.status < 400) {
			var boardData = JSON.parse(this.response) 		

			boardData.map((board) => {
				displayShareBoard(board)
			})
		} else {
			document.getElementById("previewbox").innerHTML = "Error Fetch";
		}
	}
	request.send(JSON.stringify(loggeduser))
}

function displayBoard(boardObject) {
	var element = document.createElement('div');
	element.id = boardObject.bname;
	element.className = "board";
	document.getElementsByTagName("div")[0].appendChild(element);

	let a = document.createElement("a");
	a.href = "column.html?uid=" + boardObject.uid + "&bid=" + boardObject._id 
	a.innerHTML = boardObject.bname
	element.append(a);

	let b = document.createElement("button");
	b.innerHTML = "Delete";
	let str1 = "deleteBoard('" + boardObject._id + "')";
	b.setAttribute("onClick", str1);
	element.append(b);

	let t = document.createElement("input");
	t.type = "text";
	t.placeholder = "Enter username to share"
	let tid = 'sh' + boardObject._id;
	t.id = tid
	element.append(t);

	let b1 = document.createElement("button");
	b1.innerHTML = "Share";
	let str2 = "shareBoard('" + boardObject._id + "')";
	b1.setAttribute("onClick", str2);
	element.append(b1);
}

function shareBoard(bid) {
	let shareuser = document.getElementById('sh' + bid).value;

	if (!shareuser) { return }

	const share = { bid: bid, uname: shareuser }

	var request = new XMLHttpRequest()

	request.open('POST', 'http://localhost:3000/addsharing', true)
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.onloadend = function () {
		//json.parse()		
		if (request.status >= 200 && request.status < 400) {
			var data = JSON.parse(this.response)
			document.getElementById("lblmsg").innerHTML = "sharing added.";
		} else {
			document.getElementById("lblmsg").innerHTML = "sharing error";
		}
	}
	request.send(JSON.stringify(share))
}

function displayShareBoard(boardObject) {
	var element = document.createElement('div');
	element.id = boardObject.bname;
	element.className = "board";
	document.getElementsByTagName("div")[0].appendChild(element);

	let a = document.createElement("a");
	a.href = "column.html?uid=" + boardObject.uid + "&bid=" + boardObject._id 
	a.innerHTML = boardObject.bname
	element.append(a);	
}

function showColumn() {
	const urlParams = new URLSearchParams(window.location.search);
	const uid = urlParams.get('uid');
	const bid = urlParams.get('bid');

	displayColumn(bid);
}

function displayColumn(boardId) {
	const bid = { bid: boardId }

	var request = new XMLHttpRequest()

	request.open('POST', 'http://localhost:3000/showcols', true)
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.onloadend = function () {

		if (request.status >= 200 && request.status < 400) {
			var colData = JSON.parse(this.response) //json.parse()
			//console.log(colData)

			colData.map((col) => {
				var element = document.createElement('div');
				element.id = 'div' + col._id;
				element.className = "column";
				document.getElementsByTagName("div")[0].appendChild(element);

				let a = document.createElement("a");
				a.href = "card.html?uid=" + urlParams.get('uid') + "&bid=" + boardId + "&cid=" + col._id
				a.innerHTML = col.colname
				element.append(a);

				let b = document.createElement("button");
				b.innerHTML = "Delete";
				let str1 = "deleteColumn('" + col._id + "')";
				b.setAttribute("onClick", str1);
				element.append(b);
			})
		} else {
			document.getElementById("previewbox").innerHTML = "Error Fetch";
		}
	}
	request.send(JSON.stringify(bid))
}

function showCard() {
	const urlParams = new URLSearchParams(window.location.search);
	const uid = urlParams.get('uid');
	const bid = urlParams.get('bid');
	const cid = urlParams.get('cid');

	displayCard(cid);
}

function displayCard(colId) {
	//api call
	const cid = { colid: colId }

	var request = new XMLHttpRequest()

	request.open('POST', 'http://localhost:3000/showcards', true)
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.onloadend = function () {

		if (request.status >= 200 && request.status < 400) {
			var cardData = JSON.parse(this.response)	

			cardData.map((card) => {
				var element = document.createElement('div');
				element.id = 'div' + card._id;
				element.className = "card";
				document.getElementsByTagName("div")[0].appendChild(element);

				let p = document.createElement("p");
				let str = card.cardname;
				element.append(str, p)

				let b = document.createElement("button");
				b.innerHTML = "Delete";
				let str1 = "deleteCard('" + card._id + "')";
				b.setAttribute("onClick", str1);
				element.append(b);
			})
		} else {
			document.getElementById("previewbox").innerHTML = "Error Fetch";
		}
	}
	request.send(JSON.stringify(cid))
}

function deleteBoard(boardId) {
	//api call
	const bid = { bid: boardId }

	var request = new XMLHttpRequest()

	request.open('POST', 'http://localhost:3000/deleteboard', true)
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.onloadend = function () {
		if (request.status >= 200 && request.status < 400) {
			var data = JSON.parse(this.response)
			document.getElementById("lblmsg").innerHTML = "Board Deleted";
		} else {
			document.getElementById("lblmsg").innerHTML = "Error";
		}
	}
	request.send(JSON.stringify(bid))
}

function deleteColumn(colId) {
	const cid = { cid: colId }

	var request = new XMLHttpRequest()

	request.open('POST', 'http://localhost:3000/deletecolumn', true)
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.onloadend = function () {
		if (request.status >= 200 && request.status < 400) {
			var data = JSON.parse(this.response)
			document.getElementById("lblmsg").innerHTML = "Column Deleted";
		} else {
			document.getElementById("lblmsg").innerHTML = "Error";
		}
	}
	request.send(JSON.stringify(cid))
}

function deleteCard(cardId) {
	//api call
	const crid = { crid: cardId }

	var request = new XMLHttpRequest()

	request.open('POST', 'http://localhost:3000/deletecard', true)
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.onloadend = function () {
		if (request.status >= 200 && request.status < 400) {
			var data = JSON.parse(this.response)
			document.getElementById("lblmsg").innerHTML = "Card Deleted";
		} else {
			document.getElementById("lblmsg").innerHTML = "Error";
		}
	}
	request.send(JSON.stringify(crid))
}