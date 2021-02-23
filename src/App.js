import React from 'react';
//Importamos nosso componente Search.js e usamos ele em APP.
import Search from './components/Search';
import './App.css'

function App() {
  return (
    <div className="App">
      <h4 className="titulo">Busca personagens de</h4>
      <h1 className="titulo">Star Wars</h1>
      <h4 className="titulo">com Autocompletar em ReactJS</h4>
      <Search />
    </div>
  );
}

export default App;