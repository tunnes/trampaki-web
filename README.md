
![Chat Preview](https://github.com/tunnes/trampaki-web/blob/master/view/img/readme_header.png)
============
[![Build Status](https://img.shields.io/badge/Desenvolvimento-68%25-green.svg)](https://travis-ci.org/shama/gaze)
[![Build Status](https://img.shields.io/badge/Licen%C3%A7a-MIT-blue.svg)](https://travis-ci.org/shama/gaze)
[![Build Status](https://img.shields.io/badge/Demo-Desativada-red.svg)](https://travis-ci.org/shama/gaze)
[![Build Status](https://img.shields.io/badge/Linguagem-Portugu%C3%AAs%20BR-brightgreen.svg)](https://travis-ci.org/shama/gaze)

<table>
    <tr>
        <td>
        Um cliente web para acesso a recursos disponíveis na <a href="https://github.com/tunnes/trampaki">Trampaki API </a>, 
        com este cliente o usuário pode interagir de forma gráfica e ergométrica com anunciantes, prestadores de serviços, 
        mapas e muito mais,foi desenvolvido para ser compatível com a maioria dos navegadores e resoluções disponíveis além 
        de contar com a utilização de padrões avançadas de UX, UI e modernas técnicas de otimização de performance e o melhor 
        ele esta todo na língua Brazuca!        
        </td>
    </tr>
</table>
![Page Preview](https://github.com/tunnes/trampaki-web/blob/master/view/img/readme_body.gif)

---

## Principais Caracteristicas
- Chat Fluido.
- Manipulação de imagens.
- Totalmente responsivo.
- Baixo acoplamento.
- Geolocalização customizada com Google Maps API.
- SEO On-Page forte.

---

## Tecnologias Utilizadas
- HTML5
- CSS3
- JQuery 3.1.1
- Framework Boostrap 3.3.7
- Google Maps JavaScript API v3.26
- PHP 7.0.4
- API Blueprint

---

## Rotas Disponíveis

<table>
    <tr>
        <th><sub>ROTA</sub></th>
        <th><sub>USUÁRIO</sub></th>
        <th><sub>DESCRIÇÃO</sub></th> 
        <th><sub>SITUAÇÃO</sub></th> 
    </tr>
    <tr>
        <td><strong><sub>/</sub></strong></td>
        <td><sub>Visitante</sub></td>    
        <td>
            <sub>
            Contêm informações sobre o sistema, links de acesso, um resumo e cidades disponíveis.
            </sub>
        </td>
        <td><sub>Completa</sub></td>
    </tr>
    <tr>
        <td><strong><sub>/login</sub></strong></td>
        <td><sub>Visitante</sub></td>    
        <td><sub>Definida para acesso ao sistema.</sub></td>
        <td><sub>Completa</sub></td>
    </tr>
    <tr>
        <td><strong><sub>/docs</sub></strong></td>
        <td><sub>Visitante</sub></td>        
        <td><sub>Definida visualização da documentação da API.</sub></td>
        <td><sub>Incompleta</sub></td>
    </tr>
    <tr>
        <td><strong><sub>/novo-prestador</sub></strong></td>
        <td><sub>Visitante</sub></td>        
        <td><sub>Para cadastro de novos prestadores de serviço.</sub></td>
        <td><sub>Completa</sub></td>
    </tr>    
    <tr>
        <td><strong><sub>/novo-anunciante</sub></strong></td>
        <td><sub>Visitante</sub></td>        
        <td><sub>Para cadastro de novos anunciantes.</sub></td>
        <td><sub>Completa</sub></td>
    </tr>        
    <tr>
        <td><strong><sub>/painel-prestador</sub></strong></td>
        <td><sub>Prestador de Serviços</sub></td>        
        <td><sub>Definida para manipulação de serviços.</sub></td>
        <td><sub>Incompleta</sub></td>
    </tr>
    <tr>
        <td><strong><sub>/painel-anunciante</sub></strong></td>
        <td><sub>Anunciante</sub></td>        
        <td><sub>Definida para cadastro e manipulação de anuncios.</sub></td>
        <td><sub>Incompleta</sub></td>
    </tr>      
</table>
