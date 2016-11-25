function caralhuda(){
    $("form").submit(function(){
        var formData = new FormData($(this)[0]);
            $.ajax({
                url: 'https://trampaki-api-tunnes.c9users.io/novo-prestador',
                type: 'POST',
                data: formData,
                async: true,
                cache: false,
                contentType: false,
                processData: false,
                statusCode: {
                    400:function(data) {
                        modalConectar1(data);
                    },
                    201:function(data, textStatus, request){
                            sessionStorage.setItem('authorization', request.getResponseHeader('authorization'));
                            sessionStorage.setItem('trampaki-id', request.getResponseHeader('trampaki-id'));                            
                            sessionStorage.setItem('trampaki-user', request.getResponseHeader('trampaki-user'));                            
                            window.location.assign("https://trampaki-web-tunnes.c9users.io/painel-prestador");  
                    }
                }
                
            }); 
        return false;
    }); 		
}

function carregarCategorias(){
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

function mascaraTelefone(){
    
    /* M�scaras ER */
    function mascara(o,f){
        v_obj=o
        v_fun=f
        setTimeout(
            function (){
                v_obj.value=v_fun(v_obj.value)
            },1)
    }
    
    function mtel(v){
        v=v.replace(/\D/g,"");             //Remove tudo o que n�o � d�gito
        v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca par�nteses em volta dos dois primeiros d�gitos
        v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca h�fen entre o quarto e o quinto d�gitos
        return v;
    }
    function id( el ){
      return document.getElementById( el );
    }
    window.onload = function(){
      id('usuario_telefone').onkeypress = function(){
        mascara( this, mtel );
      }
    }
}

function mascaraCep(){

  function mascara(o,f){
    v_obj=o
    v_fun=f
    setTimeout(function (){
        v_obj.value=v_fun(v_obj.value);},
        1
    )};
    
    function mtel(v){
        v=v.replace(/\D/g,"");             //Remove tudo o que n�o � d�gito
        v=v.replace(/^(\d{5})(\d)/g,"$1-$2"); //Coloca par�nteses em volta dos dois primeiros d�gitos
        // v=v.replace(/(\d)(\d{3})$/,"$1-$2");    //Coloca h�fen entre o quarto e o quinto d�gitos
        return v;
    }
    function id( el ){
      return document.getElementById( el );
    }
    id('codigo_postal').onkeypress = function(){
        mascara( this, mtel );
      
    }
}

function modalConectar1(data){
            console.log(data.responseText);
            data = JSON.parse(data.responseText);
            console.log(data);
            var erroINFO = '';
            var arrayResponse = [].slice.call(data);
                arrayResponse.forEach(function(erro){
                    erroINFO+= "<strong>" + erro.codigo + "</strong> : <span>" + erro.descricao + "</span><br>";
                });
        document.getElementById('modal_titulo').innerHTML = 'Ops parace um erro bino!';
    document.getElementById('modal_descricao').innerHTML = erroINFO;                                
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

