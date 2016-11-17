<?php
#   Configuração de requisições ao servidor:
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Authorization, TrampakiUser");
//  header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
    header('Access-Control-Expose-Headers: *');
    require_once 'configuration/router.php';
    require_once 'configuration/autoload-geral.php';

    $roteador =  new Router();
    $rotas = array(
        '/'                         =>'pagina-principal',
        '/login'                    =>'login',
        '/painel-prestador'         =>'painel-prestador',
        '/novo-prestador'           =>'cadastro-prestador',
        '/novo-anunciante'          =>'cadastro-anunciante'        
    );
    
    foreach ($rotas as $URL => $CLASS) { $roteador -> novaRota($URL, $CLASS); }
    $roteador -> rotear();
?>