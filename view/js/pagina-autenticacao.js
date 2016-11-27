/*
    global $ 
*/    

function efetuarAutenticacao(){
    $.ajax({
        type: 'POST',
        url:'https://trampaki-api-tunnes.c9users.io/login',
        data: { 
            login: document.getElementById('login').value, 
            senha: document.getElementById('senha').value
        },
        statusCode: {
            401:function() {
 
                console.log('INVALIDO');
            },
            200:function(data, textStatus, request){
                sessionStorage.setItem('authorization', request.getResponseHeader('authorization'));
                sessionStorage.setItem('trampaki-user', request.getResponseHeader('trampaki-user'));
                sessionStorage.setItem('trampaki-id', request.getResponseHeader('trampaki-id'));
                request.getResponseHeader('trampaki-user') == '0' ? direcionarPainelAnunciante() : direcionarPainelPrestador();  
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