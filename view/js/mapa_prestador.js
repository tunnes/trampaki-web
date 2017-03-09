/*global google*/
function mapEngine(){
    var mapa;
    var ultimo = new google.maps.Marker();
    
//  GERAR MAPA --------------------------------------------------------------------------------------------------------------
    function inicializar(){
    //  O objeto 'posicaoAtual' recebe como parametro as cordenadas relativas ao ponto onde o usuario se encontra
    //  tornando este o centro da tela será necessário tornar isto dinâmico, com um request Ajax.
        var posicaoAtual = new google.maps.LatLng(-23.96425614, -46.38520819);
        
    //  O JSON 'configuracoes' carrega as informações para renderização do mapa, sendo 'zoom' em relação ao nivel inicial
    //  o 'center' para o centro da tela, e o 'mapTypeId' para o tipo de visão do mapa, e o 'disableDefaultUI' desativa
    //  os controles padrões que o Google oferece em seus mapas.
        var noFeatures = [
            {
            featureType: "poi",
            stylers: [
                { visibility: "off" }
            ]   
             },
                                  {
                                    featureType: "transit",
                                    stylers: [
                                      { visibility: "off" }
                                    ]   
                                  }
        ];


        var configuracoes = {
            zoom: 13,
            center: posicaoAtual,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,

            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            }
        };
        
    //  Estilizando o mapa --------------------------------------------------------------------------------------------------
        function estiloDoMapa(){
            var styles = [
                {stylers: [{hue: "#FF8C1F"}, {saturation: 60}, { lightness: -20 }, { gamma: 1.51 }]},
                {featureType: "road", elementType: "geometry", stylers: [{lightness: 100}, {visibility: "simplified"}]},
                {featureType: "road", elementType: "labels"},
                {featureType: "poi", stylers: [ { visibility: "off" }]},
                {featureType: "transit.station.bus", stylers: [{ visibility: "off" }]}
            ];
            
            var styledMap = new google.maps.StyledMapType(styles, {name: "Mapa Style"});
            
            mapa.mapTypes.set('map_style', styledMap);
            mapa.setMapTypeId('map_style');
        }
        
    //  Alcance do Usuario --------------------------------------------------------------------------------------------------
        mapa = new google.maps.Map(document.getElementById("mapa"), configuracoes);
        mapa.setOptions({styles: noFeatures});
        estiloDoMapa();
    }

//  CARREGAR MARCADORES -----------------------------------------------------------------------------------------------------
    function marcadores(){
            $.ajax({
                type: "GET",
                url:  API + "/carregar-anuncios",
                headers:{
                    "Authorization": sessionStorage.getItem("authorization")
                },
                complete: function(data){   
                    carregarMarcadores(data.responseText);
                }
            });
        function carregarMarcadores(data){
                data = JSON.parse(data);
            var arrayResponse = [].slice.call(data);
                var arrayMarcadores = [];
                
                // Tratamento de divisão por anunciante:
                function groupBy(array, property) {
                    var hash = {};
                    for (var i = 0; i < array.length; i++) {
                        if (!hash[array[i][property]]) hash[array[i][property]] = [];
                        hash[array[i][property]].push(array[i]);
                    }
                    return hash;
                }
                var agrupadoAnunciante = groupBy(arrayResponse,'cd_usuario');
                for (var indexAnunciante in agrupadoAnunciante){
                    gerarMarcador((agrupadoAnunciante[indexAnunciante][0]), agrupadoAnunciante[indexAnunciante]);
                }
                function gerarMarcador(anunciante, anuncios){
                    var marcador = new google.maps.Marker({
                        position: new google.maps.LatLng(anunciante.cd_latitude, anunciante.cd_longitude),
                        title: anunciante.nm_usuario,
                        icon: "view/img/blackHoleSun.png",
                        map: mapa,
                        animation: google.maps.Animation.DROP,
                        imagem: API + '/carregar-imagem/' + anunciante.cd_imagem+'',
                        anuncios: anuncios
                    });
                    marcador.addListener('click', function(){
                        ultimo.getAnimation() != null ? ultimo.setAnimation(null) : null;
                        carregarVisualizacao(marcador);
                    });
                    arrayMarcadores.push(marcador);
                }
                
                var clusterStyles = [
                  {
                    textColor: 'white',
                    url: 'view/img/patrick_cluster.png',
                    height: 53,
                    width: 53
                  },
                 {
                    textColor: 'white',
                    url: 'view/img/patrick_cluster.png',
                    height: 53,
                    width: 53
                  },
                 {
                    textColor: 'white',
                    url: 'view/img/patrick_cluster.png',
                    height: 53,
                    width: 53
                  }
                ];
                var mcOptions = {
                    gridSize: 50,
                    styles: clusterStyles,
                    maxZoom: 15
                };
                var markerclusterer = new MarkerClusterer(mapa, arrayMarcadores, mcOptions);
            //         var markerCluster = new MarkerClusterer(mapa, arrayMarcadores,
            // {imagePath: 'view/img/patrick_cluster.png'});
        }
        
        
        function carregarVisualizacao(marcador){
            document.getElementById('titulo').innerHTML = marcador.title;
            document.getElementById('info-moldura').style.opacity = 1;
            document.getElementById('info-moldura').style.height = "auto";
            document.getElementById('info-fundo-imagem').style.backgroundImage = "url(" +marcador.imagem+")";
            document.getElementById("anuncios").innerHTML = null;
            marcador.anuncios.forEach(function(anuncio){
                var wrapper_anuncio = document.createElement('div');
                    wrapper_anuncio.className = "anuncio";
                var anuncio_foto = document.createElement('div');
                    anuncio_foto.style.backgroundImage = "url(" + API + "/carregar-imagem/" + anuncio.cd_imagem01+")";
                    anuncio_foto.className = "foto-anuncio";
                var anuncio_titulo = document.createElement('div');
                    anuncio_titulo.innerHTML = anuncio.nm_titulo;
                    anuncio_titulo.className = "titulo-anuncio";
                var anuncio_botoes = document.createElement('div');
                    anuncio_botoes.className = 'marcador_botao';
                
                var anuncio_visualizar = document.createElement('span');
                    anuncio_visualizar.innerHTML = 'VISUALIZAR';
                    anuncio_visualizar.onclick = function(){
                        visualizaAnuncio(anuncio.cd_anuncio);
                        document.getElementById('info-moldura').style.opacity = 0;
                        document.getElementById('info-moldura').style.height = 1;
                        ultimo.setAnimation(null);                       
                    };
                var anuncio_conectar   = document.createElement('span');
                    anuncio_conectar.innerHTML = 'CONECTAR';
                    anuncio_conectar.onclick = function(){
                        enviarSolicitacao(anuncio.cd_anuncio);
                        document.getElementById('info-moldura').style.opacity = 0;
                        document.getElementById('info-moldura').style.height = 1;
                        ultimo.setAnimation(null);              
                    };                    
                    wrapper_anuncio.appendChild(anuncio_foto);
                    wrapper_anuncio.appendChild(anuncio_titulo);
                    anuncio_botoes.appendChild(anuncio_visualizar);
                    anuncio_botoes.appendChild(anuncio_conectar);
                    wrapper_anuncio.appendChild(anuncio_botoes);
                    document.getElementById("anuncios").appendChild(wrapper_anuncio);
            });
            
            marcador.setAnimation(google.maps.Animation.BOUNCE);
            ultimo = marcador;
            mapa.addListener('click', function(){
                document.getElementById('info-moldura').style.opacity = 0;
                document.getElementById('info-moldura').style.height = 1;
                ultimo.setAnimation(null);
            });
        }
    }

//  CHAMADA DE FUNCOES ------------------------------------------------------------------------------------------------------
    inicializar();
    marcadores();
}