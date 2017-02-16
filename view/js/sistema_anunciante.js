/* global novaJanela, carregarImagem, $, ItemSolicitacao */ 

function carregarDadosAnunciante(){
        novaJanela("/view/ajax/prestador-perfil.html")
        $.ajax({
            type:"GET",
            url:"https://trampaki-api-tunnes.c9users.io/carregar-dados-anunciante",
            headers:{
                "Authorization": sessionStorage.getItem("authorization")
            },
            complete: function(data){
                
                data = JSON.parse(data.responseText);
                var imagem = document.getElementById('imagem_header');
                	data.codigoImagem != null ? carregarImagem(imagem, data.codigoImagem) : null;
                	
                	document.getElementById('nm_prestador').innerHTML = data.nome;
                    
                    document.getElementById('nome').innerHTML = data.nome;
                    
                    document.getElementById('ds_profissional').innerHTML = data.dsProfissional;
                    
                    document.getElementById('ds_email').innerHTML = data.email;
                	
                	document.getElementById('cd_telefone').innerHTML = data.telefone;
                	
                    document.getElementById('sg_estado1').innerHTML = data.endereco.estado;

                	document.getElementById('header_estado').innerHTML = data.endereco.estado;
                	    
                	document.getElementById('cidade').innerHTML = data.endereco.cidade;
                	
                	document.getElementById('header_cidade').innerHTML = data.endereco.cidade; 
                	
                	document.getElementById('cep').innerHTML = data.endereco.CEP;
                	
                	document.getElementById('numResiden').innerHTML = data.endereco.numeroResidencia;   
                	   
                	document.getElementById('login').innerHTML = data.login.login;

                	document.getElementById('senha').innerHTML = data.login.senha;
                	    
                	document.getElementById('token').innerHTML = data.login.token;
                	
                	document.getElementById('profissional').style.display = 'none';
                	
                	document.getElementById('info-moldura').style.opacity = 0;
                    document.getElementById('info-moldura').style.height = 1;
                }
    });
    }

function visualizarPrestador(codigo){
    novaJanela("/view/ajax/prestador-perfil.html");
    $.ajax({
        type:"GET",
        url:"https://trampaki-api-tunnes.c9users.io/carregar-perfil-prestador/" + codigo,
        complete: function(data){
            data = JSON.parse(data.responseText);
            	
            carregarCategorias(data.categorias);
            var imagem = document.getElementById('imagem_header');
            	data.cd_imagem != null ? carregarImagem(imagem, data.cd_imagem) : null;
            	
            	document.getElementById('nm_prestador').innerHTML = data.nm_usuario;
                
                document.getElementById('nome').innerHTML = data.nm_usuario;
                
                document.getElementById('ds_profissional').innerHTML = data.ds_perfilProfissional;
                
                document.getElementById('ds_email').innerHTML = data.ds_email;
            	
            	document.getElementById('cd_telefone').innerHTML = data.ds_telefone;
            	
                document.getElementById('sg_estado1').innerHTML = data.sg_estado;

            	document.getElementById('header_estado').innerHTML = data.sg_estado;
            	    
            	document.getElementById('cidade').innerHTML = data.nm_cidade;
            	
            	document.getElementById('header_cidade').innerHTML = data.nm_cidade; 
            	
            	document.getElementById('cep').innerHTML = data.cd_cep;
            	
            	document.getElementById('numResiden').innerHTML = data.cd_numeroResidencia;
            	
            	document.getElementById('dados_acesso').style.display = 'none';
            	
            	document.getElementById('botao_01').innerHTML = 'ME CONECTAR!';

            	document.getElementById("botao_01").onclick = function (){ alert('foo');}; 
            }
});
}

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
        novaJanela("view/ajax/visualizar-anuncio.html");
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

function selecionarAnuncio(elementoDOM, codigoAnuncio){
    $.ajax({
        type:"POST",
        url:"https://trampaki-api-tunnes.c9users.io/selecionar-anuncio",
        headers:{ 
            "Authorization": sessionStorage.getItem("authorization")
        },
        data:{
        	codigoAnuncio: codigoAnuncio
        },        
        complete: function(){
            document.getElementById('ativo') ? document.getElementById('ativo').removeAttribute("id","ativo") : null;
            elementoDOM.setAttribute("id","ativo");
            sessionStorage.setItem('anuncio_selecionado', codigoAnuncio);
        }
    });
}

function meusAnuncios(){
    novaJanela("/view/ajax/visualizar-anuncios.html");

    $.ajax({
        type:"GET",
        url:"https://trampaki-api-tunnes.c9users.io/carregar-meus-anuncios",
        headers:{ 
            "Authorization": sessionStorage.getItem("authorization")
        },
        complete: function(data){
        	data = JSON.parse(data.responseText);
            var sx = ['ABERTO','ENCERRADO','CANCELADO','SUSPENSO'];
            
            [].slice.call(data).forEach(function(anuncio){
                var wrapper_item_servico = document.createElement("div");
                
                var item_servico = document.createElement("div");
                var imagem_servico = document.createElement("div");
                    anuncio.cd_imagem_01 != null ? carregarImagem(imagem_servico, anuncio.cd_imagem_01) : null;
                var info_servico = document.createElement("span");
                var titulo = document.createElement("strong");
                    titulo.innerHTML = anuncio.titulo;
                var status = document.createElement("p");
                
                var selecionado = document.createElement('div');
                    selecionado.className = 'selecionado';
                    selecionado.innerHTML = 'SELECIONADO';
                    
                    status.innerHTML = sx[parseInt(anuncio.codigoAnuncio)];
                    
                anuncio.codigoAnuncio == sessionStorage.getItem("anuncio_selecionado") ? item_servico.setAttribute("id","ativo") : null;
                item_servico.onclick=function(){
                    selecionarAnuncio(item_servico, anuncio.codigoAnuncio);
                };
                
                item_servico.className = 'item';
                imagem_servico.className = 'item_imagem';
                wrapper_item_servico.className = 'wrapper_item col-xs-6 col-sm-6 col-md-6 col-lg-4';
                info_servico.appendChild(titulo);
                    
                item_servico.appendChild(imagem_servico);
                item_servico.appendChild(info_servico);
                item_servico.appendChild(selecionado);
                wrapper_item_servico.appendChild(item_servico);
                document.getElementById('anuncios').appendChild(wrapper_item_servico);
            });
        }
    });    
}

function visualizarSolicitacoes(){
    novaJanela("view/ajax/visualizar-solicitacoes.html");
    $.ajax({
        type:"GET",
        url:"https://trampaki-api-tunnes.c9users.io/carregar-solicitacoes",
        headers:{
            "authorization": sessionStorage.getItem("authorization"),
            "trampaki_user": "0"
        },
        complete: function(data){
            data = JSON.parse(data.responseText);
            var solicitacoes = document.getElementById('solicitacoes');
            [].slice.call(data).forEach(function(solicitacao){
                var titulo    = "<a onclick='visualizarPrestador("+ solicitacao.cd_usuario +")'>" + solicitacao.nm_usuario + "</a>";
                var solicitacao_enviada  = function(){
                    var subtitulo =  "Para executar o anuncio <a onclick='visualizaMeuAnuncio("+ solicitacao.cd_anuncio+")'>"+ solicitacao.nm_titulo +"</a>.";    
                    return new ItemSolicitacao(solicitacao.cd_imagem, titulo, subtitulo, solicitacao.cd_conexao);
                }
                var solicitacao_recebida = function(){
                    var subtitulo = "Candidatou-se para o anuncio <a onclick='visualizaMeuAnuncio("+ solicitacao.cd_anuncio+")'>"+ solicitacao.nm_titulo +"</a>.";
                    return new ItemSolicitacao(solicitacao.cd_imagem, titulo, subtitulo, solicitacao.cd_conexao);
                }
                solicitacao.cd_solicitante == 0 ? solicitacao_enviada().enviada() : solicitacao_recebida().recebida();
            });
        }
    });
}

function enviarSolicitacaoAnunciante(codigoPrestrador){
	$.ajax({
        type:"POST",
        url:"https://trampaki-api-tunnes.c9users.io/nova-conexao-anunciante",
        headers:{
            "Authorization": sessionStorage.getItem("authorization")
        },
        data:{
        	codigo_anuncio: sessionStorage.getItem("anuncio_selecionado"),
        	codigo_prestador: codigoPrestrador 
        },
    	statusCode:{
    	    401: function(){
    		    modalConectar(400);
    		},
    		400: function(){
    		    modalConectar(400);
    		},
    		201: function(){
    		    modalConectar(201);
    		}
    	}
    });
}
