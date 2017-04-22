<?php
    require_once 'configuration/router.php';

    $roteador =  new Router();
    $rotas = array(
        '/'                     =>'pagina-principal',
        '/login'                =>'pagina-autenticacao',
        '/painel-prestador'     =>'painel-prestador',
        '/painel-anunciante'    =>'painel-anunciante',        
        '/novo-prestador'       =>'cadastro-prestador',
        '/novo-anunciante'      =>'cadastro-anunciante', 
        '/docs'                 =>'api-documentacao'
    );
    
    foreach ($rotas as $URL => $HTML) { $roteador -> novaRota($URL, $HTML); }
    $roteador -> rotear();
?>