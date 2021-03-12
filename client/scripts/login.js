function logincheck() {
    let un = document.getElementById('uname').value;
    let p = document.getElementById('pwd').value;

    if (!un && !p) { return }

    const u = { uname: un, pwd: p }

    var request = new XMLHttpRequest()

    request.open('POST', 'http://localhost:3000/login', true)

    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function () {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(this.response)
            window.location.href = 'home.html?uid=' + data._id
        } else {
            document.getElementById("lblmsg").innerHTML = "Error :" + this.response;
        }
    }
    request.send(JSON.stringify(u))
}

function registercheck() {
    let un = document.getElementById('uname').value;
    let p = document.getElementById('pwd').value;

    if (!un && !p) { return }

    const u = { uname: un, pwd: p }

    var request = new XMLHttpRequest()

    request.open('POST', 'http://localhost:3000/register', true)

    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(this.response)
            window.location.href = 'home.html?uid=' + data._id
        } else {

            document.getElementById("lblmsg").innerHTML = "Error: " + this.response;
        }
    }
    request.send(JSON.stringify(u))
}