const update = function(ts, ud) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://trampaki-api-tunnes.c9users.io/chat/" + sessionStorage.getItem("trampaki-id") + "/" + ud + "/" + ts);
    xhr.onreadystatechange = function() {
        if (this.readyState == xhr.DONE && xhr.status == 200) {
            var res = JSON.parse(xhr.response);
            [].slice.call(document.getElementById("wrapper-chat").getElementsByTagName("p")).forEach(function(e) {
                e.parentNode.removeChild(e);
            });
            res['history'].forEach(function(v) {
                let p = document.createElement("p");
                p.innerHTML = v;
                document.getElementById("wrapper-chat").appendChild(p);
            });
            document.getElementById("wrapper-chat").scrollTop = document.getElementById("wrapper-chat").scrollHeight;
            update(res['timestamp'], ud);
        }
    };
    xhr.send();
};

const send = function(msg, ud) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://trampaki-api-tunnes.c9users.io/chat/" + sessionStorage.getItem("trampaki-id") + "/" + ud);
    xhr.onreadystatechange = function() {
        if (this.readyState == xhr.DONE) {
            console.log(xhr.status);
        }
    };
    xhr.send(msg);
};

const list = function() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://trampaki-api-tunnes.c9users.io/chat/" + sessionStorage.getItem("trampaki-id"));
    xhr.setRequestHeader("trampaki_user", sessionStorage.getItem('trampaki-user'));
    xhr.onreadystatechange = function() {
        if (this.readyState == xhr.DONE) {
            barraLateralMensagens(JSON.parse(xhr.response));
            
        }
    };
    xhr.send();
};