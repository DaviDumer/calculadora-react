import React, { useEffect, useState } from "react";
import './css/main.css';
import icon2 from "./icons/backspace.svg";

function filtraBotoes({ e: { target: el }, state, setState }) {
  state.operator = true;
  if (el.classList.contains('btn-number')) {
    if (state.texto === '0') state.texto = '';
    state.texto = state.texto.concat(el.value)
  } else if (el.classList.contains('backspace')) {
    state.texto = state.texto.slice(0, -1);
  } else if (el.classList.contains('parenteses')) {
    state.texto = state.texto.concat(el.value)
  } else if (el.classList.contains('operator')) {
    if (state.texto === '0') return;
    if (isNaN(parseInt(state.texto.slice(-1)))) {
      if (state.texto.slice(-1) === '(' || state.texto.slice(-1) === ')') {
        state.texto = state.texto.concat(el.value)
      } else {
        state.texto = state.texto.slice(0, -1);
      }
    };
    state.texto = state.texto.concat(el.value);
  } else if (el.classList.contains('btn-equal')) {
    state.texto = `${state.valor}`
  } else if (el.classList.contains('clear')) {
    state.texto = '0';
  } else if (el.classList.contains('clear-all')) {
    state.texto = '0';
    state.valor = 0
  }
  try { 
    console.log(state.texto);
    const test = eval(state.texto); // criar uma função para fazer calculo!!!
    state.valor = test;
  } catch (err) {} 
  finally {
    setState({ ...state })
  }
}

function App() {
  const [state, setState] = useState({
    operator: false,
    valor: 0,
    texto: '0'
  });

  function textoAExibir(texto = state.texto) {
    let display = '';
    let i = 0;
    while (texto.length > i) {
      if (texto.slice(i, i + 1) === '/') {
        display = display.concat("÷");
      } else if (texto.slice(i, i + 1) === '*') {
        display = display.concat("x");
      } else {
        display = display.concat(texto.slice(i, i + 1));
      }
      i++
    };
    return display;
  }

  useEffect(() => {
    document.addEventListener('click', (e) => {
      filtraBotoes({ e, state, setState });
    });
  }, []);
  return (
    <main id="container">
      <div id="box">
        <header id="header" >
          <h1 id="title">Calculadora</h1>
          <h2 id="value">{state.valor}</h2>
          <h2 id="text">{textoAExibir()}</h2>
        </header>
        <aside></aside>
        <section id="keyboard">
          <button className="btn clear" value="CE" >CE</button>
          <button className="btn clear-all" value="C" >C</button>
          <button className="btn backspace" >
            <img  src={icon2} alt="backspace"  width={30} className="backspace" />
          </button>
          <button className="btn operator" value="/" >&divide;</button>
          {/* <button className="btn operator">&divide;</button> */}

          <button className="btn parenteses" value="(" >(</button>
          <button className="btn parenteses" value=")" >)</button>

          <button className="btn btn-number" value="7" >7</button>
          <button className="btn btn-number" value="8" >8</button>
          <button className="btn btn-number" value="9" >9</button>
          <button className="btn operator" value="*" >x</button>

          <button className="btn btn-number" value="4" >4</button>
          <button className="btn btn-number" value="5" >5</button>
          <button className="btn btn-number" value="6" >6</button>
          <button className="btn operator" value="-" >-</button>

          <button className="btn btn-number" value="1" >1</button>
          <button className="btn btn-number" value="2" >2</button>
          <button className="btn btn-number" value="3" >3</button>
          <button className="btn operator" value="+" >+</button>

          <button className="btn">&#37;</button>
          <button className="btn btn-number" value="0" >0</button>
          <button className="btn" value="," >,</button>
          <button className="btn btn-equal" value="=" >=</button>
        </section>
      </div>
    </main>
  );
};

export default App;