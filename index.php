<?php
#   Configuração de requisições ao servidor:
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Authorization, TrampakiUser");
//  header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
    
    require_once 'configuration/router.php';
    require_once 'configuration/autoload-geral.php';

    $roteador =  new Router();
    $rotas = array(
        '/'                         =>'pagina-principal',
        '/login'                    =>'login',
        '/painel-de-operacoes'      =>'PaginaDeOperacoes',
        '/novo-anuncio'             =>'NovoAnuncio',
        '/novo-prestador'           =>'NovoPrestador',
        '/novo-anunciante'          =>'NovoAnunciante',
        '/nova-conexao-prestador'   =>'NovaConexaoPrestador',
        '/nova-conexao-anunciante'  =>'NovaConexaoAnunciante',
        '/nova-categoria'           =>'NovaCategoria',
        '/editar-anuncio'           =>'EditarAnuncio',
        '/editar-anunciante'        =>'EditarAnunciante',
        '/editar-prestador'         =>'EditarPrestador',
        '/carregar-anuncio'         =>'CarregarAnuncio',
        '/carregar-anuncios'        =>'CarregarAnuncios',
        '/carregar-imagem'          =>'CarregarImagem',
        '/aceitar-conexao'          =>'AceitarConexao',
        '/carregar-categorias'      =>'CarregarCategorias',
        '/carregar-prestadores'     =>'CarregarPrestadores',
        '/meus-servicos'            =>'CarregarMeusServicos',
        '/carregar-solicitacoes'    =>'CarregarSolicitacoes',
        '/carregar-meus-anuncios'   =>'CarregarMeusAnuncios',
        '/carregar-dados-prestador' =>'CarregarDadosPrestador',
        '/carregar-dados-anunciante'=>'CarregarDadosAnunciante',
    );
    
    foreach ($rotas as $URL => $CLASS) { $roteador -> novaRota($URL, $CLASS); }
    $roteador -> rotear();
?>