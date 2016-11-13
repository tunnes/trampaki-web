<?php
    function carregarClasses($classe){
        file_exists ('controller/'. $classe . ".php")   ? require_once('controller/'. $classe . ".php")      : null;
        file_exists ('model/BPO/'. $classe . ".php")    ? require_once('model/BPO/'. $classe . ".php")       : null;
        file_exists ('model/DAO/'. $classe . ".php")    ? require_once('model/DAO/'. $classe . ".php")       : null;
        file_exists ('configuration/'.$classe .".php")  ? require_once('configuration/'. $classe . ".php")   : null;
    }
    spl_autoload_register('carregarClasses');
?>