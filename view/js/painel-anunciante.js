/*global novaJanela */ 

function novoAnuncio(){
    novaJanela('view/ajax/novo-anuncio.html');
}

function cadastrarAnuncio(){
    $("form").submit(function(){
        var formData = new FormData($(this)[0]);
            $.ajax({
                url: 'https://trampaki-api-tunnes.c9users.io/novo-anuncio',
                headers:{ "Authorization": sessionStorage.getItem("authorization")  },
                type: 'POST',
                data: formData,
                async: true,
                cache: false,
                contentType: false,
                processData: false,
                statusCode: {
                    400:function(data) {
                        console.log('Deu ruim')
                    },
                    201:function(data, textStatus, request){
                        alertaCadastrado();
                    }
                }
                
            }); 
        return false;
    }); 		
}
function pularCombobox(){
    $.ajax({
        type: "GET",
        url:'https://trampaki-api-tunnes.c9users.io/carregar-categorias',
        complete: function(data){   
            data = data.responseText;
            data = JSON.parse(data);
            
            var categoriasDOM;
            var arrayResponse = [].slice.call(data);
            var arrayMarcadores = [];
                arrayResponse.forEach(function(categoria){
                    categoriasDOM = categoriasDOM + "<option value='" + categoria.cd_categoria + "'>" + categoria.nm_categoria + "</option>";
                });
            $('#codigo_categoria_01').append(categoriasDOM);
            $('#codigo_categoria_02').append(categoriasDOM);
            $('#codigo_categoria_03').append(categoriasDOM);            
            
        }
    });
}
function alertaCadastrado(){
    document.getElementById('modal_titulo').innerHTML = "ANUNCIO CADASTRADO";
    document.getElementById('modal_descricao').innerHTML = "SEU ANUNCIO FOI CADASTRO COM SUCESSO PARABENS CARA, SÉRIO MESMO.";                
    
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
function visualizaMeuAnuncio(codigoAnuncio){
        novaJanela("view/ajax/painel-anunciante/visualizar-anuncio.html");
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
function meusAnuncios(){
    novaJanela("/view/ajax/painel-anunciante/visualizar-anuncios.html");
	    
    $.ajax({
        type:"GET",
        url:"https://trampaki-api-tunnes.c9users.io/carregar-meus-anuncios",
        headers:{ 
            "Authorization": sessionStorage.getItem("authorization")
        },
        complete: function(data){
        	data = JSON.parse(data.responseText);
            var anuncios = document.getElementById('servicos');
            
            var sx = ['ABERTO','ENCERRADO','CANCELADO','SUSPENSO'];
            
            [].slice.call(data).forEach(function(anuncio){
                var item_servico = document.createElement("div");
                var imagem_servico = document.createElement("div");
                    anuncio.cd_imagem_01 != null ? carregarImagem(imagem_servico, anuncio.cd_imagem_01) : null;
                var info_servico = document.createElement("div");
                var titulo = document.createElement("strong");
                    titulo.innerHTML = anuncio.titulo;
                var status = document.createElement("p");
                    
                    status.innerHTML = sx[parseInt(anuncio.codigoAnuncio)];
                    
                item_servico.onclick=function(){
                    visualizaMeuAnuncio(anuncio.codigoAnuncio);
                };
                
                item_servico.className = 'item_servico';
                imagem_servico.className = 'imagem_servico';
                info_servico.className = 'info_servico';

                info_servico.appendChild(titulo);
                    
                item_servico.appendChild(imagem_servico);
                item_servico.appendChild(info_servico);
                anuncios.appendChild(item_servico);
            	});
            		
            }
});    
}

function visualizarSolicitacoes(){
    novaJanela("view/ajax/painel-anunciante/visualizar-solicitacoes.html");
    $.ajax({
        type:"GET",
        url:"https://trampaki-api-tunnes.c9users.io/carregar-solicitacoes",
        headers:{
            "Authorization": sessionStorage.getItem("authorization"),
            "TrampakiUser":"0"
        },
        complete: function(data){
                data = JSON.parse(data.responseText);
                var table = document.getElementById('suprise');
                [].slice.call(data).forEach(function(soli){
                    var x = "<tr>"+
                                "<td>"+ soli.cd_anuncio +"</td>"+
                                "<td>"+ soli.nm_titulo  +"</td>"+
                                "<td>"+ 
                                    "<a onclick='visualizarPrestador("+ soli.cd_usuario +")'>"+ soli.nm_usuario +"</a>"+
                                "</td>"+ 
                                "<td>"+ 
                                    "<a class='soli_generic soli_aceitar' onclick='aceitarConexao("+ soli.cd_conexao +")'>ACEITAR</a>"+
                                    "<a class='soli_generic soli_recusar' onclick='recusarConexao("+ soli.cd_conexao +")'>RECUSAR</a>"+
                                "</td>"+
                            "</tr>";
                            
                    soli.cd_status == '0' ? table.innerHTML = table.innerHTML + x : null;            
                });
                 
                
        }
    });
} 


