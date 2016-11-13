
function modalConectar(status){
    var descricao_201 = "Solicitação enviada com sucesso, em breve sua solicitação sera respondida.";
    var descricao_400 = "Solicitação já enviada, por favor selecione outro anuncio ou entre em contato com nossa equipe.";

    var titulo_201 = "Solicitacão Efetuada";
    var titulo_400 = "THE ERRO HAS BEEN PLANTED";

        switch (status) {
            case 201:
                document.getElementById('modal_titulo').innerHTML = titulo_201;
                document.getElementById('modal_descricao').innerHTML = descricao_201;                
                break;
            case 400:
                document.getElementById('modal_titulo').innerHTML = titulo_400;
                document.getElementById('modal_descricao').innerHTML = descricao_400;                
                break;
        }    

    var modal = document.getElementById('modal_principal');
        modal.style.display = "block";
    document.getElementById('modal_retornar').onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    
}

