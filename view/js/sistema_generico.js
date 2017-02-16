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

function novaJanela(caminho){
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
            "authorization": sessionStorage.getItem("authorization"),
            "content-type": "application/x-www-form-urlencoded"
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
function recusarConexao(codigoConexao){
    $.ajax({
        type:"PUT",
        url:"https://trampaki-api-tunnes.c9users.io/recusar-conexao",
        headers:{
            "authorization": sessionStorage.getItem("authorization"),
            "content-type": "application/x-www-form-urlencoded"
        },
        data:{
            cd_conexao: codigoConexao
        },
        statusCode:{
            200:function(){
                alert('Servico recusado com sucesso.')
            }
        }
    });
}
function cancelarConexao(codigoConexao){
    $.ajax({
        type:"DELETE",
        url:"https://trampaki-api-tunnes.c9users.io/cancelar-conexao",
        headers:{
            "authorization": sessionStorage.getItem("authorization"),
            "content-type": "application/x-www-form-urlencoded"
        },
        data:{
            cd_conexao: codigoConexao
        },
        statusCode:{
            200:function(){
                alert('Servico cancelado com sucesso.')
            }
        }
    });    
}

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
    return elemento;
}

/* SOLICITAÇÕES GLOBAIS ----------------------------------------------------- */ 
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

//  Prototipação de elementos 'ItemSolicitação' 
var ItemSolicitacao = function(imagem, titulo, subtitulo, codigo){
    this.codigo = codigo;
    
    this.wrapper_buttom = document.createElement("div");
    this.info_solicitacao = document.createElement("span");
    this.item_solicitacao = document.createElement("div");
    this.item_imagem = document.createElement("div");
    this.titulo = document.createElement("strong");
    this.subtitulo = document.createElement("span");
    this.wrapper_item_solicitacao = document.createElement("div");
    
    
    this.button_cancelar = document.createElement("span");
    this.buttom_aceitar = document.createElement("span");
    this.buttom_recusar = document.createElement("span");
    this.item_imagem = carregarImagem(this.item_imagem, imagem);
    this.subtitulo.innerHTML = subtitulo;
    this.titulo.innerHTML = titulo;
};
    ItemSolicitacao.prototype.classes = function(){
        this.item_solicitacao.className = 'item';
        this.item_imagem.className = 'item_imagem';
        this.subtitulo.className = 'item_texto';
        this.button_cancelar.className = 'item_buttons button_cancelar';
        this.buttom_aceitar.className = 'item_buttons buttom_aceitar';
        this.buttom_recusar.className = 'item_buttons buttom_recusar';
        this.wrapper_item_solicitacao.className = 'wrapper_item col-xs-6 col-sm-6 col-md-6 col-lg-4';
    }
    ItemSolicitacao.prototype.montar  = function(){
        this.info_solicitacao.appendChild(this.titulo);                  
        this.info_solicitacao.appendChild(this.subtitulo);
        this.item_solicitacao.appendChild(this.item_imagem);
        this.item_solicitacao.appendChild(this.info_solicitacao);
    }
    ItemSolicitacao.prototype.finalizar = function (identificador){
        this.classes();
        this.wrapper_item_solicitacao.appendChild(this.item_solicitacao);
        document.getElementById(identificador).appendChild(this.wrapper_item_solicitacao)
    }
    ItemSolicitacao.prototype.enviada = function(){
        this.button_cancelar.innerHTML = "<i class='glyphicon glyphicon-remove'></i> CANCELAR";
        this.montar();
        var cd_solicitacao = this.codigo;
        var elemento = this.wrapper_item_solicitacao;
        this.button_cancelar.onclick = function(){ 
            $(elemento).fadeOut( "slow" ); 
            cancelarConexao(cd_solicitacao);
        };
        this.wrapper_buttom.appendChild(this.button_cancelar);
        this.item_solicitacao.appendChild(this.wrapper_buttom);
        this.finalizar('solicitacoes_enviadas');
    }
    ItemSolicitacao.prototype.recebida = function(){
        this.buttom_recusar.innerHTML = "<i class='glyphicon glyphicon-remove'></i> RECUSAR";
        this.buttom_aceitar.innerHTML = "<i class='glyphicon glyphicon-ok'></i> ACEITAR";
        
        this.montar();
        var cd_solicitacao = this.codigo;
        var elemento = this.wrapper_item_solicitacao;
        
        this.buttom_aceitar.onclick = function(){ 
            $(elemento).fadeOut( "slow" ); 
            aceitarConexao(cd_solicitacao); 
        };
        this.buttom_recusar.onclick = function(){
            $(elemento).fadeOut( "slow" ); 
            recusarConexao(cd_solicitacao);
        };
            
        this.wrapper_buttom.appendChild(this.buttom_aceitar);
        this.wrapper_buttom.appendChild(this.buttom_recusar);
        this.item_solicitacao.appendChild(this.wrapper_buttom);
        this.finalizar('solicitacoes_recebidas');      
    }