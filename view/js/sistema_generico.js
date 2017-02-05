// Especial 'Chat'
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

// Funcoes a serem refatoradas

function sairDoSistema(){
    sessionStorage.removeItem('authorization');
    sessionStorage.removeItem('trampaki-user');
    window.location.href = "/";
}

function novaJanela(caminho, id){
    document.getElementById('info-moldura').style.opacity = 0;
    document.getElementById('info-moldura').style.height = 1;
    $("#janela").load(caminho);
	$("#janela").fadeIn('slow');
	$("#mapa").hide();
}

function janelaChat(caminho, id, nome){
    novaJanela(caminho);
    $("#janela").load(caminho, function() {
        var nomeContato = document.getElementById('nomeContato');
        nomeContato.innerHTML = nome;
        if (id) {
	        update(null, id);
	    }
	    document.getElementById("sendbox").onclick = function() {
	        const x = document.getElementById("messagebox").value;
	        if (x) {
    	        send(x, id);
    	        document.getElementById("messagebox").value = "";
	        }
	    };
    });        
}

function barraLateralMensagens(j){
document.getElementById('configuracaoAjax').style.borderBottom = '2px solid white';
document.getElementById('menu-painel').style.borderBottom = 'none';
document.getElementById('chat').style.display = 'block';
document.getElementById('painel').style.display = 'none';
  
// Future code here...
document.getElementById('chat').innerHTML = "";
j.forEach(function(v) {
    let x = document.createElement("span");
    x.innerHTML = v['nuu'];
    x.onclick = function() {
        janelaChat("view/ajax/chat.html", v['cuu'], v['nuu']);
    }
    document.getElementById('chat').appendChild(x);
    document.getElementById('chat').appendChild(document.createElement("br"));
});
}

function carregarCategorias(arrayCategorias){
//  Para esta função funcionar corretamente os elementos receptores de categorias
//  devem possuir o id nomeado de 'categorias'.s 
    var categoriasDOM = document.getElementById('categorias');
        categoriasDOM.innerHTML = '';
    [].slice.call(arrayCategorias).forEach(function(categoria){
        categoriasDOM.innerHTML = categoriasDOM.innerHTML + "<div class='categoria'>" + categoria.nome + "</div>";	
    });
}

function carregarImagem(elemento, codigoImagem){
    elemento.style.backgroundImage = "url(https://trampaki-api-tunnes.c9users.io/carregar-imagem/" + codigoImagem;
}

function retornar(){
	$("#janela").hide();
	$("#mapa").show();
}

function visualizaAnuncio(codigoAnuncio){
        novaJanela("view/ajax/prestador-anuncio.html");
    	
    	$.ajax({
            type:"GET",
            url:"https://trampaki-api-tunnes.c9users.io/carregar-anuncio/" + codigoAnuncio,
            headers:{
                "Authorization": sessionStorage.getItem("authorization")
            },
            complete: function(data){
                data = JSON.parse(data.responseText);

                carregarCategorias(data.categorias);
                
                var descricaoDOM = document.getElementById('longHistorio');
                    descricaoDOM.innerHTML = data.descricao;
    			
    			var tituloAnuncioDOM = document.getElementById('tituloAnuncioDOM');
                    tituloAnuncioDOM.innerHTML = data.titulo;
                    
                var caminhoImagem = "url(https://trampaki-api-tunnes.c9users.io/carregar-imagem/"   
                    
                var imagem01 = document.getElementById('imagem01');
                    data.cd_imagem_01 != null ? imagem01.style.backgroundImage = caminhoImagem + data.cd_imagem_01 : null;
                
                var imagem02 = document.getElementById('imagem02');
            	    data.cd_imagem_02 != null ? imagem02.style.backgroundImage = caminhoImagem + data.cd_imagem_02 : null;
                
                var imagem03 = document.getElementById('imagem03');
                    data.cd_imagem_03 != null ? imagem03.style.backgroundImage = caminhoImagem + data.cd_imagem_03 : null;
                    		
                $('#conectar').click(function(){
                    enviarSolicitacao(codigoAnuncio);
                });
            }
        });
    	
    	
    	
    }

function aceitarConexao(codigoConexao){
    $.ajax({
        type:"PUT",
        url:"https://trampaki-api-tunnes.c9users.io/aceitar-conexao",
        headers:{
            "Authorization": sessionStorage.getItem("authorization"),
        },
        data:{
            cd_conexao: codigoConexao
        },
        statusCode:{
            200:function(){
                alert('Servico aceito com sucesso.')
            }
        }
    });
}

function solicitacoes(){
    novaJanela("/view/ajax/prestador-solicitacoes.html");
    $.ajax({
        type:"GET",
        url:"https://trampaki-api-tunnes.c9users.io/carregar-solicitacoes",
        headers:{
            "Authorization": sessionStorage.getItem("authorization"),
            "TrampakiUser":"1"
        },
        complete: function(data){
            data = JSON.parse(data.responseText);
            var soli_enviadDOM = document.getElementById('solicitacoes_enviadas');
            var soli_recebiDOM = document.getElementById('solicitacoes_recebidas');
            soli_enviadDOM.innerHTML = ' ';
            soli_recebiDOM.innerHTML = ' ';
            [].slice.call(data).forEach(function(solicitacao){
                var buttons_solicitacao = document.createElement("div");
                
                
                var item_solicitacao = document.createElement("div");
                var div_image_solicitacao = document.createElement("div");
                    solicitacao.cd_imagem01 != null ? carregarImagem(div_image_solicitacao, solicitacao.cd_imagem01) : null;
                    
                var info_solicitacao = document.createElement("div");
                var titulo = document.createElement("strong");
                    titulo.innerHTML = solicitacao.nm_titulo;
                var cidade = document.createElement("p");
                    cidade.innerHTML = solicitacao.nm_cidade +', '+ solicitacao.sg_estado;

                div_image_solicitacao.onclick=function(){
                    visualizaAnuncio(solicitacao.cd_anuncio)
                }
                item_solicitacao.className = 'item_solicitacao col-xs-12 col-sm-6 col-md-5';
                div_image_solicitacao.className = 'col-xs-5 col-sm-5 col-md-5 imagem_solicitacao';
                info_solicitacao.className = 'col-xs-7 col-sm-7 col-md-7 info_solicitacao';
                    
                info_solicitacao.appendChild(titulo);
                info_solicitacao.appendChild(cidade);
                       
                item_solicitacao.appendChild(div_image_solicitacao);
                
                
                if(solicitacao.cd_solicitante == 1){
                    
                    var button_cancelar = document.createElement("button");
                        button_cancelar.innerHTML = 'CANCELAR';
                        button_cancelar.className = 'item_cancelar pull-right';
                    
                    buttons_solicitacao.appendChild(button_cancelar);
                    info_solicitacao.appendChild(buttons_solicitacao);
                    item_solicitacao.appendChild(info_solicitacao);
                    
                }else if(solicitacao.cd_solicitante == 0){
                    
                    var button_aceitar = document.createElement("button");
                        button_aceitar.innerHTML = 'ACEITAR';
                    

                    button_aceitar.onclick=function(){
                        aceitarConexao(solicitacao.cd_conexao);
                    }
                        
                    var button_recusar = document.createElement("button");
                        button_recusar.innerHTML = 'RECUSAR';
                    
                    button_recusar.onclick=function(){
                        recusarConexao(solicitacao.cd_conexao);
                    }                        
                    buttons_solicitacao.appendChild(button_aceitar);
                    buttons_solicitacao.appendChild(button_recusar);
                    item_solicitacao.appendChild(buttons_solicitacao);    
                };    
                solicitacao.cd_solicitante == 1 ? soli_enviadDOM.appendChild(item_solicitacao) : soli_recebiDOM.appendChild(item_solicitacao);
            });
        }
    });
}

function soliEnviadas(e){
    e.style.borderBottom = "3px solid black";
    e.style.color = 'Black';
	document.getElementById('span_recebidas').style.borderBottom = "none";
	document.getElementById('span_recebidas').style.color  =  "gray";
	$("#solicitacoes_recebidas").hide();
    $("#solicitacoes_enviadas").fadeIn('slow');
}

function soliRecebidas(e){
    e.style.borderBottom = "3px solid black";
	e.style.color = 'Black';
	document.getElementById('span_enviadas').style.borderBottom = "none";
	document.getElementById('span_enviadas').style.color  =  "gray";
	$("#solicitacoes_recebidas").fadeIn('slow');
    $("#solicitacoes_enviadas").hide();        
}

// Funcões indefinidas temporariamente indefinidas:

function barraLateralPainel(){
    document.getElementById('configuracaoAjax').style.borderBottom = 'none';
    document.getElementById('menu-painel').style.borderBottom ='2px solid white';
    document.getElementById('chat').style.display = 'none';
    document.getElementById('painel').style.display = 'block';
    // Future code here....
}

function verificarToken(){
    sessionStorage.getItem("authorization") == null || sessionStorage.getItem("trampaki-user") != '1' ? window.location.assign("https://trampaki-api-tunnes.c9users.io/login") : null;
}

function deslogar(){
    console.log('teste');
    sessionStorage.removeItem('authorization');
    sessionStorage.removeItem('trampaki-user');
    window.location.href = "/";
}

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

function carregarCategorias(arrayCategorias){
//  Para esta função funcionar corretamente os elementos receptores de categorias
//  devem possuir o id nomeado de 'categorias'.s 
    var categoriasDOM = document.getElementById('categorias');
        categoriasDOM.innerHTML = '';
    [].slice.call(arrayCategorias).forEach(function(categoria){
        categoriasDOM.innerHTML = categoriasDOM.innerHTML + "<div class='categoria'>" + categoria.nome + "</div>";	
    });
}

function carregarImagem(elemento, codigoImagem){
    elemento.style.backgroundImage = "url(https://trampaki-api-tunnes.c9users.io/carregar-imagem/" + codigoImagem;
}