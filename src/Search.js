//Aqui importamos o react e o useState que permite criar uma variável de state
import React, { useState } from 'react'

//aqui a função de busca onde:
function Search() {
    //aqui o useState permite declarar duas variáveis e um estado inicial 
    //para elas, nestes casos vazios.
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    //aqui eu crio uma const com a URL de pesquisa. Essa é uma API simples
    //que é simples de usar e como a proposta aqui não é o consumo da API e sim
    //o autocompletar resolvi usar essa mesmo. Ela retorna uma busca de personagens de 
    //star wars.
    const searchURL = 'https://swapi.dev/api/people/?search=';

   

    //o próximo passo é fazermos a busca propriamente dita e 
    //começamos com um fetch nessa API:
    const getInfo = () => {
        //o fecth busca de forma assíncrona então SEMPRE temos de usar ele
        //com a URL que neste caso juntamos a query e o .then pra tratar 
        //a resposat recebida. Ele retorna um objeto como Promise.
        fetch(searchURL + query)
            //aqui o 1º then pega a resposta e define ela como sendo json
            .then(res => res.json())
            //tambem pega os dados e chama setSearchResults enviando como argumento
            //o data.results. Tanto searchResults quanto esse set search criamos com 
            //o useState lá no começo e definimos o estado inicial dele para vazio.
            //Agora estamos defininco o estado para os results do data do json.
            .then(data => setSearchResults(data.results))
            //se der erro ele pega aqui.
            .catch(e => {
                console.log({ error: e });
            });
    }
    //esse handleinputChange está no onchange do campo de entrada de texto.
    //ele recebe um evento e atribui o valor desse evento (o que estiver sendo digitado)
    //na const setQuery que criamos lá no início e que tem o seu state como vazio.
    //essa função é que vai preencher o state da query com as letras do que digitarmos
    //e fará isso a cada mudança, ou seja, a cada letra digitada.
    const handleInputChange = (e) => {
        setQuery(e.target.value)
        //essa condicional determina que se houver query e se o comprimento for
        //maior que zero chama getInfo, que é a nossa função inicial. Isso significa
        //que a cada caractere digitado uma busca na API é feita.
        //deixei esse console.log aqui pra acompanhar esse retorno da API.
        console.log(searchResults)
        if (query && query.length > 0) {
            getInfo();
        }
    }

    //Os resultados estão armazenados em searchResults como um array cheio de objetos.
    //cada objeto é um personagem com várias chaves, como descrito abaixo:

    // (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    // 0:
    // birth_year: "19BBY"
    // created: "2014-12-09T13:50:51.644000Z"
    // edited: "2014-12-20T21:17:56.891000Z"
    // eye_color: "blue"
    // films: (4) ["http://swapi.dev/api/films/1/", "http://swapi.dev/api/films/2/", "http://swapi.dev/api/films/3/", "http://swapi.dev/api/films/6/"]
    // gender: "male"
    // hair_color: "blond"
    // height: "172"
    // homeworld: "http://swapi.dev/api/planets/1/"
    // mass: "77"
    // name: "Luke Skywalker"
    // skin_color: "fair"
    // species: []
    // starships: (2) ["http://swapi.dev/api/starships/12/", "http://swapi.dev/api/starships/22/"]
    // url: "http://swapi.dev/api/people/1/"
    // vehicles: (2) ["http://swapi.dev/api/vehicles/14/", "http://swapi.dev/api/vehicles/30/"]
    // __proto__: Object
    // 1: {name: "R2-D2", height: "96", mass: "32", hair_color: "n/a", skin_color: "white, blue", …}
    // 2: {name: "Darth Vader", height: "202", mass: "136", hair_color: "none", skin_color: "white", …}
    // 3: {name: "Leia Organa", height: "150", mass: "49", hair_color: "brown", skin_color: "light", …}
    // 4: {name: "Owen Lars", height: "178", mass: "120", hair_color: "brown, grey", skin_color: "light", …}

    //essa função é chamada quando o usuário clica em um dos resultados.
    //ela identifica qual desses ids foi clicado e armazena em uma const chamada searchResultId.
    const handleQueryResultClick = (e) => {
        const searchResultId = e.target.id;
        //lá no useState criamos também um setSelectedCharacter que neste caso será o id
        //correspondente a ele no array de resultados. 
        //no exemplo acima se o clicado fosse o id 0 o personagem seria "Luke Skywalker"
        setSelectedCharacter(searchResults[searchResultId]);
        //e depois de fazer isso zeramos a query.
        setQuery([]);
    }

    //aqui vamos trabalhar com os resultados propriamente ditos, quando um personagem é escolhido.
    //React.Children fornece ultiltários para que possamos trabalhar os dados. Por exemplo este toArray
    //faz um map nos resultados da buscafornecendo acesso ao item e idx. A gente vai colocar o retorno desse
    //map em itens de lista como descrito abaixo.
    const results = React.Children.toArray(
        searchResults.map((item, idx) => (
            <li className='result-item' id={idx} onClick={handleQueryResultClick}>{item.name}</li>
        ))
    )

    //no return aqui do Search temos:
    return (
        //um form que vai receber a nossa entrada de texto
        <form className='search-form-container text'>
            <input
                placeholder='Procurando por...'
                //ao digitar cada letra essa função de handleInput é chamada
                onChange={handleInputChange}
                //e o valor da query é recebido pois a handleInput atribui valor para o state que atribui para a query. 
                value={query}
            />
            {/* aqui é onde vamos controlar a lista de sugestões que apaecerá ao digitarmos. */}
            <div className='query-results-list'>
                {/* quando o comprimento da query for maior que 1 e houver resultados eles serão exibidos */}
                {query.length > 1 && (
                    <ul>
                        {results}
                    </ul>
                )}

            </div>
            
            {/* Por fim aqui nessa div mandamos os dados que quisermos do personagem. Neste caso nome, altura e massa.
            Tudo usando os dados do selectedCharacter */}
            <div>
                {selectedCharacter ? (
                    <div className='character-display-container'>
                        <p><span className='character-info-title'>Nome:</span> {selectedCharacter.name}</p>
                        <p><span className='character-info-title'>Altura:</span> {selectedCharacter.height}</p>
                        <p><span className='character-info-title'>Massa:</span> {selectedCharacter.mass}</p>
                    </div>
                ) : (
                        <p className='no-results-prompt'>Sem resultados. Tenta digitar algo na caixa de pesquisa.</p>
                    )}
            </div>
        </form>
    )
}

export default Search