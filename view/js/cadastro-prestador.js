function caralhuda(){
    $("form").submit(function(){
        var formData = new FormData($(this)[0]);
            $.ajax({
                url: 'https://trampaki-tunnes.c9users.io/novo-prestador',
                type: 'POST',
                data: formData,
                async: true,
                cache: false,
                contentType: false,
                processData: false,
                statusCode: {
                    400:function(data, textStatus, data) {
                        console.log(data);
                    },
                    201:function(data, textStatus, request){
                            sessionStorage.setItem('authorization', request.getResponseHeader('authorization'));
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
        url:'https://trampaki-tunnes.c9users.io/carregar-categorias',
        complete: function(data){   
            data = data.responseText;
            data = JSON.parse(data);
            var categoriasDOM;
            var arrayResponse = [].slice.call(data);
            var arrayMarcadores = [];
                arrayResponse.forEach(function(categoria){
                    console.log(categoria.cd_categoria);
                    categoriasDOM = categoriasDOM + "<option value='" + categoria.cd_categoria + "'>" + categoria.nm_categoria + "</option>";
                });
            $('#codigo_categoria_01').append(categoriasDOM);
            $('#codigo_categoria_02').append(categoriasDOM);
            $('#codigo_categoria_03').append(categoriasDOM);            
            
        }
    });
}