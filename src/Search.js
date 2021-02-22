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

    const handleInputChange = (e) => {
        setQuery(e.target.value)
        if (query && query.length > 0) {
            getInfo();
        }
    }

    const handleQueryResultClick = (e) => {
        const searchResultId = e.target.id;
        setSelectedCharacter(searchResults[searchResultId]);
        setQuery([]);
    }

    const results = React.Children.toArray(
        searchResults.map((item, idx) => (
            <li className='result-item' id={idx} onClick={handleQueryResultClick}>{item.name}</li>
        ))
    )

    return (
        <form className='search-form-container text'>
            <input
                placeholder='Procurando por...'
                onChange={handleInputChange}
                value={query}
            />
            <div className='query-results-list'>
                {query.length > 1 && (
                    <ul>
                        {results}
                    </ul>
                )}

            </div>
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