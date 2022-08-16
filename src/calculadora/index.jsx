import React, { useEffect, useState } from "react";
import './css/main.css';
import icon2 from "./icons/backspace.svg";

function filtraBotoes({ e: { target: el }, state, setState }) {
  state.operator = true;
  if (el.classList.contains('btn-number')) {
    if (state.texto === '0') state.texto = '';
    state.texto = state.texto.concat(el.textContent)
  } else if (el.classList.contains('backspace')) {
    state.texto = state.texto.slice(0, -1);
  } else if (el.classList.contains('parenteses')) {
    state.texto = state.texto.concat(el.textContent)
  } else if (el.classList.contains('operator')) {
    if (state.texto === '0') return;
    if (isNaN(parseInt(state.texto.slice(-1)))) {
      if (state.texto.slice(-1) === '(' || state.texto.slice(-1) === ')') {
        state.texto = state.texto.concat(el.textContent)
      } else {
        state.texto = state.texto.slice(0, -1);
      }
    };
    state.texto = state.texto.concat(el.textContent);
  } else if (el.classList.contains('btn-equal')) {
    state.texto = `${state.valor}`
  } else if (el.classList.contains('clear')) {
    state.texto = '';
  } else if (el.classList.contains('clear-all')) {
    state.texto = '0';
    state.valor = 0
  }
  try {
    const test = eval(state.texto);
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
          <h2 id="text">{state.texto}</h2>
        </header>
        <aside></aside>
        <section id="keyboard">
          <button className="btn clear">CE</button>
          <button className="btn clear-all">C</button>
          <button className="btn backspace">
            <img  src={icon2}  width={30} className="backspace"/>
          </button>
          <button className="btn operator">/</button>
          {/* <button className="btn operator">&divide;</button> */}

          <button className="btn parenteses">(</button>
          <button className="btn parenteses">)</button>
          {/* <button className="btn"></button>
          <button className="btn"></button> */}
          

          <button className="btn btn-number">7</button>
          <button className="btn btn-number">8</button>
          <button className="btn btn-number">9</button>
          <button className="btn operator">*</button>

          <button className="btn btn-number">4</button>
          <button className="btn btn-number">5</button>
          <button className="btn btn-number">6</button>
          <button className="btn operator">-</button>

          <button className="btn btn-number">1</button>
          <button className="btn btn-number">2</button>
          <button className="btn btn-number">3</button>
          <button className="btn operator">+</button>

          <button className="btn">&#37;</button>
          <button className="btn btn-number">0</button>
          <button className="btn">,</button>
          <button className="btn btn-equal">=</button>
        </section>
      </div>
    </main>
  );
};

export default App;