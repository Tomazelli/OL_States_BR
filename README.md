# OL_States_BR
 implementação do exemplo "Box Selection" do open layers para estados do Brasil
 
Para versões mais recentes do Openlayers (testado com OpenLayers v6.5.0) o código de exemplo "Box Selection" (https://openlayers.org/en/latest/examples/box-selection.html) não está funcionando devido a uma nova politica Cross-origin resource sharing (CORS), para contornar o problema, foi utilizado uma extensão para o navegador chrome (adaptavel para Opera GX) "Moesif Origin & CORS Changer" (https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc?hl=en-US) e alterando o GeoJSON do exemplo para uma versão com as informações referentes aos estados do Brasil (https://www.rocklabdigital.com/static/geojson/estado.geojson)

Para rodar uma versão local use o comando "npm start" com o prompt de comando (windows) na pasta do projeto
e em seguida acesse o navegador (Com a extensão "Moesif Origin & CORS Changer" ativa, ou alguma solução alternativa para a politica CORS) no endereço http://localhost:1234

O código foi passado para um lintter para formatação em boas praticas. (JSlint: https://www.jslint.com com opção whitespace mess marcada, pois a identação do código é feita com dois espaços e nao quatro)

As declarações "var" foram substituidas por "let".

Aspas simples (') foram substituidas por aspas duplas (").

Operadores ternarios foram colocados dentro de parentesis com quebra de linha:

let identifier = (

    expression ? doSomethingIfExpressionIsTrue() : doOtherThingIfExpressionIsFalse()
    
  );
  
Retiradas virgulas desnecessárias no final da declaração de objetos



(Todos os links foram acessados e estavam funcionando no dia 14/02/2021 )
