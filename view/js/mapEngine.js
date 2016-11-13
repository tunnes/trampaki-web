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
                url:  "https://trampaki-tunnes.c9users.io/carregar-anuncios",
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
                arrayResponse.forEach(function(anuncio){
                    
                    var marcador = new google.maps.Marker({
                        position: new google.maps.LatLng(anuncio.cd_longitude, anuncio.cd_latitude),
                        title: anuncio.titulo,
                        icon: "view/img/blackHoleSun.png",
                        // icon: "view/img/more_marker.png",
                        // icon: "view/img/blackHoleSun.png",
                        map: mapa,
                        animation: google.maps.Animation.DROP,
                        imagem: 'https://trampaki-tunnes.c9users.io/carregar-imagem/'+anuncio.cd_imagem01+'',
                        descricaoSimples: anuncio.ds_anuncio,
                        estrelas: anuncio.estrelas,
                        titulo: anuncio.nm_titulo,
                        codigo: anuncio.cd_anuncio
                    });
                    marcador.addListener('click', function(){
                        ultimo.getAnimation() != null ? ultimo.setAnimation(null) : null;
                        carregarVisualizacao(marcador);
                    });
                    arrayMarcadores.push(marcador);
                });
                
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
            document.getElementById('titulo').textContent = marcador.titulo;
            document.getElementById('info-moldura').style.opacity = 1;
            document.getElementById('info-moldura').style.height = "auto";
            document.getElementById('info-fundo-imagem').style.backgroundImage = "url(" +marcador.imagem+")";
            document.getElementById('descricao').textContent = marcador.descricaoSimples;
           
            marcador.setAnimation(google.maps.Animation.BOUNCE);
            ultimo = marcador;
            mapa.addListener('click', function(){
                document.getElementById('info-moldura').style.opacity = 0;
                document.getElementById('info-moldura').style.height = 1;
                ultimo.setAnimation(null);
            });
            $("#pain" ).click(function(){ 
                visualizaAnuncio(marcador.codigo);
                document.getElementById('info-moldura').style.opacity = 0;
                document.getElementById('info-moldura').style.height = 1;
                ultimo.setAnimation(null);
            });
            $("#momo" ).click(function(){ 
                enviarSolicitacao(marcador.codigo);
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