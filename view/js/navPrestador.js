// Evento acionado quando html é carregado não esperando por folhas
// de estilo ou imagens.

document.addEventListener("DOMContentLoaded", function() {
  verificaStack();
  manipulaNav("painel", alteraEstado);
  switchItemNav("painel", window.history.state, "#ef914c");
  
  
window.onpopstate = () => {
    if(window.history.state != null) {
        inserirConteudo(ajeitaCaminho(window.history.state));
        switchItemNav("painel", window.history.state, "#ef914c");
     } else {
         window.location.href="/login";   
    }}});

var adapterPaths = {
    "perfil"       : "prestador-perfil",
    "solicitacoes" : "prestador-solicitacoes",
    "servicos"     : "prestador-servicos",
};

var ajeitaCaminho = function (url) {
    if(adapterPaths.hasOwnProperty(url)) {
        return "/view/ajax/" + adapterPaths[url] + ".html";
    } else 
        return "/view/ajax/" + url + ".html";
}
var verificaStack = function () {
    var path = window.location.href.split("/")[4];
    if(path !== undefined) {
        if(window.history.state != path) {
            window.history.pushState(path, null, null);
            inserirConteudo(ajeitaCaminho(window.history.state));
        } else {
            inserirConteudo(ajeitaCaminho(window.history.state));
        }
      }
}
var alteraEstado = function (page) {
    // Essa verificação serve para não ficar recarregando o ajax toda vez que se clica no mesmo botão.
    if(page != window.history.state) {
        if(window.location.href.split("/")[4] === undefined){
           window.history.pushState(page, null, "painel-prestador/" + page); 
        } else {
            window.history.pushState(page, null, page);
        }
        inserirConteudo(ajeitaCaminho(page));
    }
}
var manipulaNav = (id, callback) => 
    document.getElementById(id).addEventListener('click', (e) => {
        if(e["target"].id != id) {
            callback(e.target.attributes['data-content']['nodeValue']);
            switchItemNav(id, window.history.state, "#ef914c");
        }
  });
var switchItemNav = function(idPainel, itemAtual, cor) {
     [].map.call(document.getElementById(idPainel).children, function(n) {
          n.style.backgroundColor = "inherit";
          return n;
     }).forEach(function(e) {
         if(e["attributes"]["data-content"]["value"] == itemAtual) {
             e.style.backgroundColor = cor;
         }
     });
}
var inserirConteudo = function (ref) {
     // Direcionador de Chamadas
     switch (window.history.state) {
            case "perfil":
                pageCaller(ref, {func: setPerfilPrestador, resource: "/carregar-dados-prestador", met: "GET"}, headerPrestador);
                break;
            case "solicitacoes":
                pageCaller(ref, {func: setSolicitacoesPrestador, resource: "/carregar-solicitacoes", met: "GET"}, headerPrestador);
                break;
            case "servicos":
                pageCaller(ref, {func: setServicos, resource: "/meus-servicos", met: "GET"}, headerPrestador);
                break;
            case "mapa":             $("#janela").fadeOut(500); $("#mapa").show();  break;
            case "sair":             window.sairDoSistema(); break;
            default:                 pageCaller(ref, null, headerPrestador); break;
     }
}

