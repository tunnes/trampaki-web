<?php
    require_once 'configuration/router.php';

    $roteador =  new Router();
    $rotas = array(
        '/'                                 =>'pagina-principal',
        '/login'                            =>'pagina-autenticacao',
        '/painel-prestador'                 =>'painel-prestador',
        '/painel-prestador/perfil'          =>'painel-prestador',
        '/painel-prestador/solicitacoes'    =>'painel-prestador',
        '/painel-prestador/servicos'        =>'painel-prestador',
        '/painel-prestador/mapa'            =>'painel-prestador',
        '/painel-prestador/sair'            =>'painel-prestador',
        '/painel-anunciante'                =>'painel-anunciante',
        '/painel-anunciante/perfil'         =>'painel-anunciante',
        '/painel-anunciante/novoAnuncio'    =>'painel-anunciante',
        '/painel-anunciante/anuncios'       =>'painel-anunciante',
        '/painel-anunciante/solicitacoes'   =>'painel-anunciante',
        '/painel-anunciante/mapa'           =>'painel-anunciante',
        '/painel-anunciante/sair'           =>'painel-anunciante',
        '/novo-prestador'                   =>'cadastro-prestador',
        '/novo-anunciante'                  =>'cadastro-anunciante',
        '/docs'                             =>'api-documentacao'
    );
    
    foreach ($rotas as $URL => $HTML) { $roteador -> novaRota($URL, $HTML); }
    $roteador -> rotear();
?>