/* 
    global $,
    novaJanela, 
    carregarImagem,
    ItemSolicitacao 
*/

/*  VISUALIZAR MEU PERFIL --------------------------------------------------- */
    function carregarDadosAnunciante(){
        //novaJanela("/view/ajax/prestador-perfil.html");
        pageCaller("/view/ajax/prestador-perfil.html", null);
        $.ajax({
            type:"GET",
            url:API + "/carregar-dados-anunciante",
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

//  VISUALIZAR PERFIL DO PRESTADOR ---------------------------------------------
    function visualizarPrestador(codigo){
    novaJanela("/view/ajax/prestador-perfil.html");
    $.ajax({
        type:"GET",
        url:API + "/carregar-perfil-prestador/" + codigo,
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

//  CADASTRAR UM NOVO ANUNCIO --------------------------------------------------
    function cadastrarAnuncio(){
        $("form").submit(function(){
            var formData = new FormData($(this)[0]);
                $.ajax({
                    url: API + '/novo-anuncio',
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
    function popularCombobox(){
        $.ajax({
            type: "GET",
            url:API + '/carregar-categorias',
            complete: function(data){   
                data = data.responseText;
                data = JSON.parse(data);
                
                var categoriasDOM;
                var arrayResponse = [].slice.call(data);
                var arrayMarcadores = [];
                    arrayResponse.forEach(function(categoria){
                        categoriasDOM = categoriasDOM + "<option value='" + categoria.cd_categoria + "'>" + categoria.nm_categoria + "</option>";
                    });
                    $('#codigo_categoria_01, #codigo_categoria_02, #codigo_categoria_03').append(categoriasDOM);
            }
        });
    }
    
    /*
    function novoAnuncio(){
        novaJanela('view/ajax/novo-anuncio.html');
    }
    */
    
    function alertaCadastrado(){
        document.getElementById('modal_titulo').innerHTML = "ANUNCIO CADASTRADO";
        document.getElementById('modal_descricao').innerHTML = "SEU ANUNCIO FOI CADASTRO COM SUCESSO PARABENS CARA, SÉRIO MESMO.";                
        
        var modal = document.getElementById('modal_principal');
        modal.style.display = "block";
        document.getElementById('modal_retornar').onclick = function() { modal.style.display = "none";}
        window.onclick = function(event) { event.target == modal ? modal.style.display = "none" : null; }
    }

//  VISUALIZAR MEU ANUNCIO -----------------------------------------------------  
    function visualizaMeuAnuncio(codigoAnuncio){
            novaJanela("/view/ajax/visualizar-anuncio.html");
        	$.ajax({
                type:"GET",
                url:API + "/carregar-anuncio/" + codigoAnuncio,
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
                        
                    var caminhoImagem = "url(" + API + "/carregar-imagem/"   
                        
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

//  VISUALIZAR TODOS OS MEUS ANUNCIOS ------------------------------------------
    function selecionarAnuncio(elementoDOM, codigoAnuncio, wrapper_buttom){
    $.ajax({
        type:"POST",
        url:API + "/selecionar-anuncio",
        headers:{ 
            "Authorization": sessionStorage.getItem("authorization")
        },
        data:{
        	codigoAnuncio: codigoAnuncio
        },        
        complete: function(){
            document.getElementById('wrapper_buttom_ativo') ? document.getElementById('wrapper_buttom_ativo').removeAttribute("id","wrapper_buttom_ativo") : null;
            wrapper_buttom.setAttribute("id","wrapper_buttom_ativo");
            document.getElementById('ativo') ? document.getElementById('ativo').removeAttribute("id","ativo") : null;
            elementoDOM.setAttribute("id","ativo");
            sessionStorage.setItem('anuncio_selecionado', codigoAnuncio);
        }
    });
}
    function alternacaoDeAnuncios(e){
        $(".anuncio_sinalizador").hide();
        $(".filtro_sinalizador").style.borderBottom = "none";
        $(".filtro_sinalizador").style.color = "gray";
        
        e.style.borderBottom = "3px solid black";
        e.style.color = 'Black';
        // $("#solicitacoes_enviadas").fadeIn('slow');
    }
    function meusAnuncios(){
        var ItemAnuncio = function(codigo, status, titulo, imagem){
                this.codigo = codigo;
                this.titulo = titulo;
                this.imagem = imagem;
                this.status = status;
                this.wrapper_item_servico = document.createElement("div");
                this.wrapper_buttom = document.createElement("div");
                this.imagem_servico = document.createElement("div");
                this.item_servico = document.createElement("div");
                this.selecionado = document.createElement('div');
                this.item_titulo = document.createElement("strong");
                this.info_servico = document.createElement("span");
                this.buttom_visualizar = document.createElement("span");
                this.buttom_encerrar = document.createElement("span");
            }
            ItemAnuncio.prototype.eventos = function(){
                var codigo = this.codigo;
                var item_servico = this.item_servico;
                var wrapper_buttom = this.wrapper_buttom;
                this.item_servico.onclick = function(){
                    selecionarAnuncio(item_servico, codigo, wrapper_buttom);
                };
                
                this.buttom_visualizar.onclick = function(){
                    visualizaMeuAnuncio(codigo);
                }
                this.buttom_encerrar.onclick = function(){
                    encerrarAnuncio(codigo);
                }
            }
            ItemAnuncio.prototype.classes = function(){
                var selecionado = function(item_servico, wrapper_buttom){ 
                    item_servico.setAttribute("id","ativo"); 
                    wrapper_buttom.setAttribute("id","wrapper_buttom_ativo");
                };
                this.codigo == sessionStorage.getItem("anuncio_selecionado") ?  selecionado(this.item_servico, this.wrapper_buttom) : null;
                this.wrapper_item_servico.className = 'wrapper_item col-xs-6 col-sm-6 col-md-6 col-lg-4';
                this.imagem_servico.className = 'item_imagem';
                this.selecionado.className = 'selecionado';
                this.item_servico.className = 'item';
                this.buttom_visualizar.className = 'item_buttons buttom_visualizar';
                this.buttom_encerrar.className = 'item_buttons buttom_encerrar';
                this.wrapper_buttom.className = 'wrapper_buttom';
            }
            ItemAnuncio.prototype.popular = function(){
                this.selecionado.innerHTML = 'SELECIONADO';
                this.item_titulo.innerHTML = this.titulo;
                this.buttom_visualizar.innerHTML = "<i class='glyphicon glyphicon-plus'></i> VISUALIZAR";
                this.buttom_encerrar.innerHTML = "<i class='glyphicon glyphicon-minus'></i> ENCERRAR";
   
                this.eventos();
                this.classes();
                this.montar();
            }
            ItemAnuncio.prototype.montar = function(){
                
                this.imagem != null ? carregarImagem(this.imagem_servico, this.imagem) : null;
                this.info_servico.appendChild(this.item_titulo);
                this.item_servico.appendChild(this.imagem_servico);
                this.item_servico.appendChild(this.info_servico);
                this.item_servico.appendChild(this.selecionado);
                this.wrapper_buttom.appendChild(this.buttom_visualizar);
                this.wrapper_buttom.appendChild(this.buttom_encerrar);
                this.item_servico.appendChild(this.wrapper_buttom);
                this.wrapper_item_servico.appendChild(this.item_servico);
                var ST = ['anuncios_abertos','anuncios_encerrados', 'anuncios_suspensos'];
                document.getElementById(ST[parseInt(this.status)]).appendChild(this.wrapper_item_servico);
            }


        

        function filtroAnuncio(filtro_pos, wrapper_pos, filtro_neg, wrapper_neg){
            $(filtro_pos).css('border-bottom','3px solid black');
            $(filtro_pos).css('color','Black');
            $(wrapper_pos).fadeIn('slow');
            
        	$(filtro_neg).css('border-bottom','none');
        	$(filtro_neg).css('color','gray');
        	$(wrapper_neg).hide();
        }
    
    
        
        //novaJanela("/view/ajax/visualizar-anuncios.html");
        pageCaller("/view/ajax/visualizar-anuncios.html", null); 
        
        $.ajax({
            type:"GET",
            url:API + "/carregar-meus-anuncios",
            headers:{ 
                "Authorization": sessionStorage.getItem("authorization")
            },
            complete: function(data){
            	data = JSON.parse(data.responseText);
                var ST = ['anuncios_abertos','anuncios_encerrados', 'anuncios_suspensos'];
                
                [].slice.call(data).forEach(function(anuncio){
                    var a = new ItemAnuncio(anuncio.codigoAnuncio, anuncio.codigoStatus, anuncio.titulo ,anuncio.cd_imagem_01);
                        a.popular();
                });
                
                document.getElementById('span_aberto').onclick = function(){
                    filtroAnuncio('#span_aberto', '#anuncios_abertos', '#span_suspenso, #span_encerrado', '#anuncios_suspensos, #anuncios_encerrados');
                }
                document.getElementById('span_encerrado').onclick = function(){
                    filtroAnuncio('#span_encerrado', '#anuncios_encerrados', '#span_aberto, #span_suspenso', '#anuncios_suspensos, #anuncios_abertos');
                }
                document.getElementById('span_suspenso').onclick = function(){
                    filtroAnuncio('#span_suspenso', '#anuncios_suspensos', '#span_aberto, #span_encerrado', '#anuncios_abertos, #anuncios_encerrados');
                }
            }
        });    
    }

//  VISUALIZAR SOLICITAÇÕES ----------------------------------------------------
    function visualizarSolicitacoes(){
    //novaJanela("view/ajax/visualizar-solicitacoes.html");
    pageCaller("/view/ajax/visualizar-solicitacoes.html", null);
    
    $.ajax({
        type:"GET",
        url:API + "/carregar-solicitacoes",
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

//  ENVIAR SOLICITAÇÃO PARA O PRESTADOR ----------------------------------------
    function enviarSolicitacaoAnunciante(codigoPrestrador){
	$.ajax({
        type:"POST",
        url:API + "/nova-conexao-anunciante",
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

//  FECHAR MEU ANUNCIO --------------------------------------------------------
    function encerrarAnuncio(codigo){
        document.getElementById('modal_titulo').innerHTML = "DESEJA ENCERRAR O ANUNCIO OU SUSPENDÊ-LO?";
        // document.getElementById('modal_descricao').innerHTML = "SEU ANUNCIO FOI CADASTRO COM SUCESSO PARABENS CARA, SÉRIO MESMO.";                
        var e = document.createElement('span');
        var s = document.createElement('span');
            e.innerHTML = "ENCERRAR";
            s.innerHTML = "SUSPENDER";
            e.className = "buttom_modal buttom_modal_encerrar";
            s.className = "buttom_modal";
            e.onclick = function (){
                modal.style.display = "none";
                document.getElementById('info-moldura').style.opacity = 0;
                document.getElementById('info-moldura').style.height = 1;
                $("#janela").load("/view/ajax/anunciante-encerrar.html", function(){
                    $("#janela").fadeIn('slow') ;
            	    $("#mapa").hide();            
                    prestadoresEnvolvidos(codigo);
                });
            }
            
        document.getElementById("corpo-modal").innerHTML = null;
        document.getElementById("corpo-modal").appendChild(e);
        document.getElementById("corpo-modal").appendChild(s);
        var modal = document.getElementById('modal_principal');
        modal.style.display = "block";
        window.onclick = function(event) { event.target == modal ? modal.style.display = "none" : null; }
    }
    
//  CARREGAR TODOS OS PRESTADORES ENVOLVIDOS COM O ANUNCIO ---------------------
    function prestadoresEnvolvidos(codigoAnuncio){
        var ItemEnvolvido = function(codigoConexao, codigoPrestador, titulo, imagem){
                this.codigoConexao = codigoConexao;
                this.codigoPrestador = codigoPrestador;
                this.titulo = titulo;
                this.imagem = imagem;
                this.wrapper_item_servico = document.createElement("div");
                this.imagem_servico = document.createElement("div");
                this.item_servico = document.createElement("div");
                this.selecionado = document.createElement('div');
                this.item_titulo = document.createElement("strong");
                this.info_servico = document.createElement("span");
            }
            ItemEnvolvido.prototype.eventos = function(){
                var item_servico = this.item_servico;
                var codigoPrestador = this.codigoPrestador;
                this.item_servico.onclick = function(){
                    document.getElementById('ativo') ? document.getElementById('ativo').removeAttribute("id","ativo") : null;
                    item_servico.setAttribute("id","ativo");
                    sessionStorage.setItem('prestador_envolvido', codigoPrestador);
                };
            }
            ItemEnvolvido.prototype.classes = function(){
                this.wrapper_item_servico.className = 'wrapper_item col-xs-4 col-sm-4 col-md-3 col-lg-3';
                this.imagem_servico.className = 'item_imagem';
                this.selecionado.className = 'selecionado';
                this.item_servico.className = 'item';
            }
            ItemEnvolvido.prototype.popular = function(){
                this.selecionado.innerHTML = 'OK';
                this.item_titulo.innerHTML = this.titulo;
                this.classes();
                this.eventos();
                this.montar();
            }
            ItemEnvolvido.prototype.montar = function(){
                this.imagem != null ? carregarImagem(this.imagem_servico, this.imagem) : null;
                this.info_servico.appendChild(this.item_titulo);
                this.item_servico.appendChild(this.imagem_servico);
                this.item_servico.appendChild(this.info_servico);
                this.item_servico.appendChild(this.selecionado);
                this.wrapper_item_servico.appendChild(this.item_servico);
                document.getElementById('prestadores_envolvidos').appendChild(this.wrapper_item_servico);
            }

        $.ajax({
            type:"GET", 
            url:API + "/carregar-envolvidos/" + codigoAnuncio,
            headers:{
                "Authorization": sessionStorage.getItem('authorization') 
            },
            complete: function(data){
                data = JSON.parse(data.responseText);
                [].slice.call(data).forEach(function(prestador){
                    var canditado = new ItemEnvolvido(prestador.cd_conexao, prestador.cd_usuario, prestador.nm_usuario, prestador.cd_imagem);
                        canditado.popular();
                        sessionStorage.setItem('codigo_conexao', prestador.cd_conexao);
                });
            }
        });
    }
    function enviarAvaliacao(){
        var codigo_prestador = sessionStorage.getItem('prestador_envolvido');
        var codigo_conexao = sessionStorage.getItem('codigo_conexao');
        var nota_valor = document.querySelector('input[name="nota_valor"]:checked').value;
        var nota_servico = document.querySelector('input[name="nota_servico"]:checked').value;
        var descricao = document.getElementById('texto_descricao').value
        $.ajax({
            url: API + '/nova-avaliacao',
            headers:{ "Authorization": sessionStorage.getItem("authorization")  },
            type: 'POST',
            data: {
                codigo_prestador: codigo_prestador,
                codigo_conexao: codigo_conexao ,
                nota_servico: nota_servico, 
                nota_valor: nota_valor, 
                descricao: descricao
            },
            statusCode: {
                400:function(data) {
                    alert('Deu ruim');
                },
                201:function(){
                    alert('Avaliacao efetuada!');
                }
            }
            
        });
    }
    
// CARREGA OS DADOS INICIAIS DO ANUNCIANTE QUE SERVIRÃO PARA AS NOTIFICAÇÕES
    function carregarDadosIniciais(){
        $.ajax({
            url: API + '/dados-iniciais-anunciante',
            headers:{ "Authorization": sessionStorage.getItem("authorization")  },
            type: 'GET',
            complete: function(data) {
                data = JSON.parse(data.responseText);
                sessionStorage.setItem('ultimo_anuncio_aceito',data.ultimo_anuncio_aceito);
                LongPolling();
            }
        });
        
    }
//  EDITAR ANUNCIO
function editarAnuncio(){
    novaJanela("/view/ajax/editar-anuncio.html")
}

// LONG POLLING DE NOTIFICAÇÕES

    function LongPolling(){
        $.ajax({
            url: API + '/longpolling-anunciante',
            headers:{ "Authorization": sessionStorage.getItem("authorization"),
                      "ultimo_anuncio_aceito": sessionStorage.getItem('ultimo_anuncio_aceito')
            },
            type: 'GET',
            complete: function(data) {
                data = JSON.parse(data.responseText);
                console.log(data);
                if('anuncios_aceitos' in data){
                    var notification = new Notification(data.anuncios_aceitos[0].titulo, {
                        icon:  API + "/carregar-imagem/" + data.anuncios_aceitos[0].imagem,
                        body:  data.anuncios_aceitos[0].prestador + ' aceitou o seu anúncio.'
                    });
                    notification.onclick = function() {
                        window.open(WEB+"/painel-anunciante","_self");
                    }
                    sessionStorage.setItem('ultimo_anuncio_aceito',data.anuncios_aceitos[0].codigo);
                }
                setTimeout(LongPolling(),3000);
            }
        });
    }

//FIREBASE

const messaging = firebase.messaging();
messaging.requestPermission().then(function(){
    console.log("Possui permissão.");
    return messaging.getToken();
}).catch(function(err){
    carregarDadosIniciais();
    console.log("Ocorreu um erro: " + err);
})
messaging.onMessage(function(payload){
    console.log("onMessage", payload);
    var notification = new Notification(payload.notification.title, {
        icon: payload.notification.icon,
        body: payload.notification.body
    });
    notification.onclick = function() {
        window.open(WEB+payload.notification.href,"_self");
    }
});
