/*global $*/ 
    function novaJanela(caminho){
        document.getElementById('info-moldura').style.opacity = 0;
        document.getElementById('info-moldura').style.height = 1;
        $("#janela").load(caminho);
    	$("#janela").fadeIn('slow');
    	$("#mapa").hide();
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
        elemento.style.backgroundImage = "url(https://trampaki-tunnes.c9users.io/carregar-imagem/" + codigoImagem;
    }
    
    function retornar(){
    	$("#janela").hide();
    	$("#mapa").show();
    }
    
    function visualizaAnuncio(codigoAnuncio){
        novaJanela("view/ajax/prestador-anuncio.html");
    	
    	$.ajax({
            type:"GET",
            url:"https://trampaki-tunnes.c9users.io/carregar-anuncio/" + codigoAnuncio,
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
                    
                var caminhoImagem = "url(https://trampaki-tunnes.c9users.io/carregar-imagem/"   
                    
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
    
    function enviarSolicitacao(codigoAnuncio){
    	$.ajax({
            type:"POST",
            url:"https://trampaki-tunnes.c9users.io/nova-conexao-prestador",
            headers:{
                "Authorization": sessionStorage.getItem("authorization")
            },
            data:{
            	codigo_anuncio: codigoAnuncio
            },
        	statusCode:{
        		400: function(){
        		    modalConectar(400);
        		},
        		201: function(){
        		    modalConectar(201);
        		}
        	}
        });
    }

    function barraLateralMensagens(){
    document.getElementById('configuracaoAjax').style.borderBottom = '2px solid white';
    document.getElementById('menu-painel').style.borderBottom = 'none';
    document.getElementById('chat').style.display = 'block';
    document.getElementById('painel').style.display = 'none';
    
    // Future code here....  
}
    function barraLateralPainel(){
    document.getElementById('configuracaoAjax').style.borderBottom = 'none';
    document.getElementById('menu-painel').style.borderBottom ='2px solid white';
    document.getElementById('chat').style.display = 'none';
    document.getElementById('painel').style.display = 'block';
    // Future code here....
}

//  MEU-PERFIL ------------------------------------------------------------------------------------------------
    function meuPerfil(){
        novaJanela("/view/ajax/prestador-perfil.html")
        $.ajax({
            type:"GET",
            url:"https://trampaki-tunnes.c9users.io/carregar-dados-prestador",
            headers:{
                "Authorization": sessionStorage.getItem("authorization")
            },
            complete: function(data){
                data = JSON.parse(data.responseText);
                	
                carregarCategorias(data.categorias);
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
                		
                }
    });
    }
    
//  MEUS-SERVICOS ---------------------------------------------------------------------------------------------

    function meusServicos(){
        novaJanela("/view/ajax/prestador-servicos.html");
	    
	    $.ajax({
            type:"GET",
            url:"https://trampaki-tunnes.c9users.io/meus-servicos",
            headers:{ 
                "Authorization": sessionStorage.getItem("authorization")
            },
            complete: function(data){
            	data = JSON.parse(data.responseText);
                var servicos = document.getElementById('servicos');
                	servicos.innerHTML = ' ';
                var sx = ['ABERTO','ENCERRADO','CANCELADO','SUSPENSO'];
                [].slice.call(data).forEach(function(servico){
                    var item_servico = document.createElement("div");
                    var imagem_servico = document.createElement("div");
                        servico.cd_imagem01 != null ? carregarImagem(imagem_servico, servico.cd_imagem01) : null;
                    var info_servico = document.createElement("div");
                    var titulo = document.createElement("strong");
                        titulo.innerHTML = servico.nm_titulo;
                    var cidade = document.createElement("p");
                        cidade.innerHTML = servico.nm_cidade;
                    var status = document.createElement("p");
                        
                        status.innerHTML = sx[parseInt(servico.cd_status)];
                        
                    item_servico.onclick=function(){
                        visualizaAnuncio(servico.cd_anuncio);
                    };
                    item_servico.className = 'item_servico';
                    imagem_servico.className = 'imagem_servico';
                    info_servico.className = 'info_servico';

                    info_servico.appendChild(titulo);
                    info_servico.appendChild(cidade);
                    info_servico.appendChild(cidade); 
                    info_servico.appendChild(status);
                        
                        
                    item_servico.appendChild(imagem_servico);
                    item_servico.appendChild(info_servico);
                    servicos.appendChild(item_servico);
                	});
                		
                }
    });
	    
    }

//  SOLICITAÇÕES ----------------------------------------------------------------------------------------------
    function aceitarConexao(codigoConexao){
        $.ajax({
            type:"PUT",
            url:"https://trampaki-tunnes.c9users.io/aceitar-conexao",
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
    function solicitacoesRecebidas(){}
    function solicitacoesEnviadas(){}
    function solicitacoes(){
	    novaJanela("/view/ajax/prestador-solicitacoes.html");
	    $.ajax({
            type:"GET",
            url:"https://trampaki-tunnes.c9users.io/carregar-solicitacoes",
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
    
    