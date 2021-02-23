# Busca em ReactJS com sugestões e autocompletar
Uma busca de personagens de Star Wars em React com recurso de autocompletar.
Acesse o demo: 

<img src="https://tomipasin.com/assets/img/StarWars3.png" />
<hr/>
<img src="https://tomipasin.com/assets/img/StarWars2.png" />
<hr/>
<img src="https://tomipasin.com/assets/img/StarWars1.png" />

## Como faz?
Usando a api de <a href="https://swapi.dev/">https://swapi.dev/</a> criei uma página em React para busca de personagens. O objetivo é usar o useState do React para permitir que tenhamos estágios "intermediários" por assim dizer na nossa busca. Com ele podemos ter uma query mas também um setQuery que vai ser usado para incrementar a URL de consumo da API a cada caractere digitado.

Usamos também o fetch para fazer uma busca assíncrona e receber um JSON a cada iteração. Exibimos as sugestões extraídas desse JSON como itens de uma lista logo abaixo do campo de pesquisa.

## Como testar?
Bem, o primeiro passo é clonar esse repositório.
Feito isso use o npm para instalar as dependências que estão no package.json:

```sh
npm install
```

Depois disso é só ininciar o servidor. Por padrão deixei na porta 3001 mas isso pode ser alterado no server.js.

```sh
npm start
```

O código do nosso <strong><i>/src/components/Search.js</i></strong> está totalmente comentado, para melhor compreensão:

<img src="https://tomipasin.com/assets/img/StarWarsCarbon.png" />

Qualquer duvida é só me chamar em tomipasin@gmail.com ou no Telegram em @tomipasin.
