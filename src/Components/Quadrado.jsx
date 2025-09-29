import "../Styles/Quadrado.css"

function Quadrado ({value, onQuadrado}) {

    return (
        <button className="quadrado" onClick={onQuadrado}>
            {value}
        </button>
    )  
}

export default Quadrado;