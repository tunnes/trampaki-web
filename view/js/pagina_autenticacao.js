/*
    global $ 
*/    

function paginaAutenticacao(){
    $(document).keypress(function(e){ 
        e.which == 13 ? efetuarAutenticacao() : null; 
    });
}

function efetuarAutenticacao(){
    $.ajax({
        type: 'POST',
        url: API + '/login',
        data: {
            login: document.getElementById('login').value, 
            senha: document.getElementById('senha').value,
            token: self.token
        },
        statusCode: {
            401:function() {
                autenticacaoErro();
            },
            200:function(data, textStatus, request) {
                sessionStorage.setItem('authorization', request.getResponseHeader('authorization'));
                sessionStorage.setItem('trampaki_user', request.getResponseHeader('trampaki_user'));
                sessionStorage.setItem('trampaki-id', request.getResponseHeader('trampaki-id'));
                sessionStorage.setItem('anuncio_selecionado', request.getResponseHeader('anuncio_selecionado'));
                request.getResponseHeader('trampaki_user') == '0' ? direcionarPainelAnunciante() : direcionarPainelPrestador();  
            }
        }
    });
}

function direcionarPainelAnunciante(){ 
    return window.location.href = "/painel-anunciante";
}

function direcionarPainelPrestador(){ 
    return window.location.href = "/painel-prestador";
}

function autenticacaoErro(){
    document.getElementById('modal_titulo').innerHTML = "LOGIN E SENHA INVÁLIDOS, POR FAVOR TENTE NOVAMENTE.";
    document.getElementById("corpo-modal").innerHTML = null;
    var s = document.createElement('span');
        s.innerHTML = "OK";
        s.className = "buttom_modal";
        s.onclick = function (){
            modal.style.display = "none";
        }
    document.getElementById("corpo-modal").appendChild(s);
    var modal = document.getElementById('modal_principal');
        modal.style.display = "block";
    window.onclick = function(event) { 
        event.target == modal ? modal.style.display = "none" : null; 
    }
}

//FIREBASE

const messaging = firebase.messaging();
messaging.requestPermission().then(function(){
    console.log("Possui permissão");
    return messaging.getToken();
}).then(function(token){
    self.token = token;
    console.log("Token gerado: "+ token);
}).catch(function(err){
    self.token = null;
    console.log("Ocorreu um erro: " + err);
})