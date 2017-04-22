<?php
#   Classe para gerenciamento de rotas da aplicação.
    class Router{
        
        private $arrayRotas = array();
        private $arrayAcoes = array();
        
        public function novaRota($url, $acao){
            $this->arrayRotas[] = trim($url,'/');
            $this->arrayAcoes[] = $acao;
        }
        public function rotear(){
            $url   = $_GET['url'];
            $param = $_GET['param'];
            $chave = array_search($url, $this->arrayRotas);
            $chave === false ? include('view/pagina-404.html') : include('view/'.$this->arrayAcoes[$chave].'.html');
        }
    }
?>