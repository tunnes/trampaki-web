/*global google*/
function mapEngineAnunciante(){
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
        var noFeatures = [{
                featureType: "poi",
                stylers: [ { visibility: "off" }]   
            },
            {
                featureType: "transit",
                stylers: [{ visibility: "off" }]   
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
            var proprio_original = [
                {stylers: [{hue: "#FF8C1F"}, {saturation: 60}, { lightness: -20 }, { gamma: 1.51 }]},
                {featureType: "road", elementType: "geometry", stylers: [{lightness: 100}, {visibility: "simplified"}]},
                {featureType: "road", elementType: "labels"},
                {featureType: "poi", stylers: [ { visibility: "off" }]},
                {featureType: "transit.station.bus", stylers: [{ visibility: "off" }]}
            ];
            var laranjaDoidao = [
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fc902f"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "gamma": 0.01
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "saturation": -31
            },
            {
                "lightness": -33
            },
            {
                "weight": 2
            },
            {
                "gamma": 0.8
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 30
            },
            {
                "saturation": 30
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": 20
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 20
            },
            {
                "saturation": -20
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 10
            },
            {
                "saturation": -30
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "saturation": 25
            },
            {
                "lightness": 25
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "lightness": -20
            }
        ]
    }
]
            // melhor pra mim: 
            var snazzymaps_lost_desert =  [
                {"elementType":"labels","stylers":[{"visibility":"off"},{"color":"#f49f53"}]},{"featureType":"landscape","stylers":[{"color":"#f9ddc5"},{"lightness":-7}]},{"featureType":"road","stylers":[{"color":"#813033"},{"lightness":43}]},{"featureType":"poi.business","stylers":[{"color":"#645c20"},{"lightness":38}]},{"featureType":"water","stylers":[{"color":"#1994bf"},{"saturation":-69},{"gamma":0.99},{"lightness":43}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#f19f53"},{"weight":1.3},{"visibility":"on"},{"lightness":16}]},{"featureType":"poi.business"},{"featureType":"poi.park","stylers":[{"color":"#645c20"},{"lightness":39}]},{"featureType":"poi.school","stylers":[{"color":"#a95521"},{"lightness":35}]},{},{"featureType":"poi.medical","elementType":"geometry.fill","stylers":[{"color":"#813033"},{"lightness":38},{"visibility":"off"}]},{},{},{},{},{},{},{},{},{},{},{},{"elementType":"labels"},{"featureType":"poi.sports_complex","stylers":[{"color":"#9e5916"},{"lightness":32}]},{},{"featureType":"poi.government","stylers":[{"color":"#9e5916"},{"lightness":46}]},{"featureType":"transit.station","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","stylers":[{"color":"#813033"},{"lightness":22}]},{"featureType":"transit","stylers":[{"lightness":38}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#f19f53"},{"lightness":-10}]},{},{},{}
                ]
            var meu_lost_desert =  [
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#f49f53"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#d65600"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#060606"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f9ddc5"
            },
            {
                "lightness": -7
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "color": "#645c20"
            },
            {
                "lightness": 38
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "all",
        "stylers": [
            {
                "color": "#9e5916"
            },
            {
                "lightness": 46
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "lightness": 38
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
            {
                "color": "#645c20"
            },
            {
                "lightness": 39
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "all",
        "stylers": [
            {
                "color": "#a95521"
            },
            {
                "lightness": 35
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "all",
        "stylers": [
            {
                "color": "#9e5916"
            },
            {
                "lightness": 32
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "lightness": 43
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f97006"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f97006"
            },
            {
                "lightness": "20"
            },
            {
                "saturation": "10"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#f97006"
            },
            {
                "saturation": "10"
            },
            {
                "lightness": "20"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f97006"
            },
            {
                "saturation": "10"
            },
            {
                "lightness": "20"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#db0303"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f19f53"
            },
            {
                "weight": 1.3
            },
            {
                "visibility": "on"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#f19f53"
            },
            {
                "lightness": -10
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "lightness": 38
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "all",
        "stylers": [
            {
                "color": "#793e10"
            },
            {
                "lightness": 22
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#1994bf"
            },
            {
                "saturation": -69
            },
            {
                "gamma": 0.99
            },
            {
                "lightness": 43
            }
        ]
    }
]
            var snazzymaps_red_alert = [
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffdfa6"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#b52127"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c5531b"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#74001b"
            },
            {
                "lightness": -10
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#da3c3c"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#74001b"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#da3c3c"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#990c19"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#74001b"
            },
            {
                "lightness": -8
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#6a0d10"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffdfa6"
            },
            {
                "weight": 0.4
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
]    
            var snazzymaps_propia_effect = [
    {
        "featureType": "landscape",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#2b3f57"
            },
            {
                "weight": 0.1
            }
        ]
    },
    {
        "featureType": "administrative",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#ff0000"
            },
            {
                "weight": 0.4
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "weight": 1.3
            },
            {
                "color": "#FFFFFF"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f55f77"
            },
            {
                "weight": 3
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f55f77"
            },
            {
                "weight": 1.1
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f55f77"
            },
            {
                "weight": 0.4
            }
        ]
    },
    {},
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "weight": 0.8
            },
            {
                "color": "#ffffff"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "weight": 0.7
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "color": "#6c5b7b"
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#f3b191"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    }
]
                
            var styledMap = new google.maps.StyledMapType(meu_lost_desert, {name: "Mapa Style"});
            
            mapa.mapTypes.set('map_style', styledMap);
            mapa.setMapTypeId('map_style');
        }
        
    //  Alcance do Usuario --------------------------------------------------------------------------------------------------
        mapa = new google.maps.Map(document.getElementById("mapa"), configuracoes);
        mapa.setOptions({styles: noFeatures});
        
    //  Correção mapa cinza:
    window.addEventListener('resize', function(event){
        google.maps.event.trigger(mapa, 'resize');
    });
        
        estiloDoMapa();
    }

//  CARREGAR MARCADORES -----------------------------------------------------------------------------------------------------
    function marcadores(){
            $.ajax({
                type: "GET",
                url:   API + "/carregar-prestadores",
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
                    arrayResponse.forEach(function(prestador){
                    
                    var marcador = new google.maps.Marker({
                        position: new google.maps.LatLng(prestador.cd_latitude, prestador.cd_longitude),
                        title: prestador.titulo,
                        icon: "view/img/blackHoleSun.png",
                        map: mapa,
                        animation: google.maps.Animation.DROP,
                        imagem: API + '/carregar-imagem/'+prestador.cd_imagem,
                        descricaoSimples: prestador.ds_perfilProfissional,
                        estrelas: prestador.estrelas,
                        titulo: prestador.nm_usuario,
                        codigo: prestador.cd_usuario
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
                // teste com o menu
            });
            document.getElementById('pain').onclick=function(){
                visualizarPrestador(marcador.codigo);
                document.getElementById('info-moldura').style.opacity = 0;
                document.getElementById('info-moldura').style.height = 1;
                ultimo.setAnimation(null);
            };
            document.getElementById('momo').onclick=function(){
                enviarSolicitacaoAnunciante(marcador.codigo);
                document.getElementById('info-moldura').style.opacity = 0;
                document.getElementById('info-moldura').style.height = 1;
                ultimo.setAnimation(null);
            };
        }
    }

//  CHAMADA DE FUNCOES ------------------------------------------------------------------------------------------------------
    inicializar();
    marcadores();
}