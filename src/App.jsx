import './App.css'

import Tabuleiro from "./Components/Tabuleiro.jsx";

function App() {

  return (
    <main>
      <Tabuleiro/>

      <figure>
        <img className='velha' src="src\images\velha.png" alt="Velhinha brava em desenho" />
      </figure>
    </main>
  )
}

export default App;