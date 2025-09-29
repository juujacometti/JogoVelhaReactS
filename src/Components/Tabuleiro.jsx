import Quadrado from "./Quadrado";
import "../Styles/Tabuleiro.css"
import { useState, useEffect } from "react";

function Tabuleiro () {
    // Para saber quais quadrados estão sendo marcados
    const [quadrados, setQuadrados] = useState(Array(9).fill(null))
    
    // Array com 9 posições diferentes e todos estaram nulos
    const [xProximo, setXProximo] = useState(true); // Para que quando renderizar o valor não seja perdido. A variável mantenha a memória (useState)

    // Criação de um placar
    const [placarX, setPlacarX] = useState(0);
    const [placarO, setPlacarO] = useState(0);

    // Função para reiniciar a partida
    function resetPartida() {
        setQuadrados(Array(9).fill(null));    
        setXProximo(true);
    }

    function handleClick(i){
        // Para que o mesmo quadrado não possa ser clicado duas vezes
        if (quadrados[i]) {
            return;
        }

        // Criando cópias das constantes
        const nextQuadrado = quadrados.slice();

        if (xProximo) {
            // Quadrado da posição X receberá "X"
            nextQuadrado[i] = "X"
        }
        else {
            nextQuadrado[i] = "O"
        }

        setQuadrados(nextQuadrado);
        setXProximo(!xProximo);
    }

    const venceu = Vencedor(quadrados);
    const empate = !venceu && quadrados.every(q => q !== null);
    let status;

    if (venceu) {
        status = "Vencedor é: " + venceu;
    }
    else if (empate) {
        status = "VELHA! 👵🏼 Ninguém ganhou!"
    }
    else {
        status = "O próximo jogador é: " + (xProximo ? "X": "O");
    }

    useEffect(() => {
        if (venceu === "X") {
            setPlacarX(p => p + 1);
        } else if (venceu === "O") {
            setPlacarO(p => p + 1);
        }
    }, [venceu]);    // Funciona apenas quando 'venceu' mudar

    return(
        <>
            <h1>Jogo da velha!</h1>
            <h2>{status}</h2>
            
            <div className="placar">
                <h3>Placar</h3>
                <p>( X ) Jogador 1: {placarX}</p>
                <p>( O ) Jogador 2: {placarO}</p>
            </div>
            
            <div className="corpoTabuleiro">
                <div className="linha">
                    <Quadrado value={quadrados[0]} onQuadrado={()=> handleClick(0)} />
                    <Quadrado value={quadrados[1]} onQuadrado={()=> handleClick(1)} />
                    <Quadrado value={quadrados[2]} onQuadrado={()=> handleClick(2)} />
                </div>

                <div className="linha">
                    <Quadrado value={quadrados[3]} onQuadrado={()=> handleClick(3)} />
                    <Quadrado value={quadrados[4]} onQuadrado={()=> handleClick(4)} />
                    <Quadrado value={quadrados[5]} onQuadrado={()=> handleClick(5)} />
                </div>

                <div className="linha">
                    <Quadrado value={quadrados[6]} onQuadrado={()=> handleClick(6)} />
                    <Quadrado value={quadrados[7]} onQuadrado={()=> handleClick(7)} />
                    <Quadrado value={quadrados[8]} onQuadrado={()=>handleClick(8)} />
                </div>

                 <button className="bntResetPartida" onClick={resetPartida}>Jogar novamente!</button>

            </div>
            
        </>
    )
}

// Função que define o vencedor
function Vencedor(quadrados){
    const linhas = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < linhas.length; i++){
        const [a,b,c] = linhas[i];
        if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c])
            return quadrados[a];
    }

    return null;
}

export default Tabuleiro;