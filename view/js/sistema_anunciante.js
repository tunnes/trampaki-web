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
            
            var tabela = document.getElementById("tabela_meus_anuncios");            
            var stringTabela = "";    
            [].slice.call(data).forEach(function(anuncio){
                
                stringTabela = stringTabela + 
                    '<tr>'+
                        '<td>'+ anuncio.codigoAnuncio +'    </td>' +
                        '<td>'+ anuncio.titulo        +'    </td>' + 
                        '<td>'+ anuncio.areaAlcance   +' Km </td>' + 
                        '<td>'+ anuncio.categorias[1] +'    </td>' +
                        '<td>'+ anuncio.categorias[2] +'    </td>' +
                        '<td>'+ anuncio.categorias[3] +'    </td>' +
                    '</tr>';
                    
                // var item_servico = document.createElement("div");
                // var imagem_servico = document.createElement("div");
                //     anuncio.cd_imagem_01 != null ? carregarImagem(imagem_servico, anuncio.cd_imagem_01) : null;
                // var info_servico = document.createElement("div");
                // var titulo = document.createElement("strong");
                //     titulo.innerHTML = anuncio.titulo;
                // var status = document.createElement("p");
                    
                //     status.innerHTML = sx[parseInt(anuncio.codigoAnuncio)];
                    
                // item_servico.onclick=function(){
                //     visualizaMeuAnuncio(anuncio.codigoAnuncio);
                // };

                
                // item_servico.className = 'item_servico';
                // imagem_servico.className = 'imagem_servico';
                // info_servico.className = 'info_servico';

                // info_servico.appendChild(titulo);
                    
                // item_servico.appendChild(imagem_servico);
                // item_servico.appendChild(info_servico);
                // anuncios.appendChild(item_servico);
            	});
            	tabela.innerHTML = stringTabela;
            		
            }
});    
}