function deslogar(){
    sessionStorage.removeItem('authorization');
    sessionStorage.removeItem('trampaki-user');
    window.location.url = "/";
}
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
    elemento.style.backgroundImage = "url(https://trampaki-api-tunnes.c9users.io/carregar-imagem/" + codigoImagem;
}