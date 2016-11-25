const update = function(ts) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://javascripts-ptkato.c9users.io/chat/" + sessionStorage.getItem("trampaki-id") + "/" + "ud");
    xhr.onreadystatechange = function() {
        if (this.readyState == xhr.DONE) {
            console.log(xhr.response);
            let res = JSON.parse(xhr.response);
            
            update(res.timestamp);
        }
    };
    xhr.send({'timestamp': ts});
};

const send = function(ts) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://javascripts-ptkato.c9users.io/chat/" + sessionStorage.getItem("trampaki-id") + "/" + "ud");
    xhr.onreadystatechange = function() {
        if (this.readyState == xhr.DONE) {
            console.log(xhr.response);
            let res = JSON.parse(xhr.response);
        }
    };
};