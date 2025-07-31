import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { FaVolleyballBall } from "react-icons/fa";
import { GiTennisCourt } from "react-icons/gi";
import { ArrowLeft, RefreshCw } from 'lucide-react';

// Lista de nomes criativos de animais para os times
const NOMES_DE_TIMES = [
  'Jacarés Furiosos',
  'Tubarões Ninja',
  'Gatos Velozes',
  'Águias Sombrias',
  'Lobos Saltitantes',
  'Pandas Selvagens',
  'Cavalos Alados',
  'Polvos Táticos',
  'Raposas Ardilosas',
  'Elefantes Atômicos',
  'Pinguins Marombas',
  'Corujas Sábias',
  'Cangurus Nervosos',
  'Ursos Cósmicos',
  'Cobras Elétricas',
  'Cachorros Voadores',
  'Galinhas Explosivas',
  'Tigres de Fogo',
  'Moranguinhos'
];

function Sorteio() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const POSICOES = ['Central', 'Ponta Direita', 'Rede', 'Ponta Esquerda', 'Fundo'];

  // Função para embaralhar um array (Fisher-Yates)
  function shuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  if (!state || !state.times) {
    return (
      <div className="App">
        <h1 className="title">Nenhum sorteio encontrado</h1>
        <button className="btn" onClick={() => navigate('/')}>Voltar</button>
      </div>
    );
  }

  const { times, listaDeEspera = [] } = state;

  // Para cada time, embaralha as posições e atribui aos jogadores
  const timesComPosicoes = times.map((time) => {
    const posicoesEmbaralhadas = shuffle(POSICOES);
    return time.map((jogador, idx) => {
      const posicao = posicoesEmbaralhadas[idx % posicoesEmbaralhadas.length];
      return { nome: jogador, posicao };
    });
  });

  // Gera nomes únicos e embaralhados para os times
  const nomesEmbaralhados = shuffle(NOMES_DE_TIMES);
  const nomesDosTimes = timesComPosicoes.map((_, idx) => nomesEmbaralhados[idx] || `Time ${idx + 1}`);

  return (
    <div className="App">
      <div className="top-bar">
        <ArrowLeft size={24} className="icon" onClick={() => navigate('/')} />
        <button className="btn" onClick={() => window.location.reload()}>
          <RefreshCw size={16} style={{ marginRight: 8 }} />
          Novo Sorteio
        </button>
      </div>

      <h1 className="title">Times Sorteados</h1>

      <div className="teams-container">
        {timesComPosicoes.map((time, index) => (
          <div key={index} className="team-card">
            <h3>
              {nomesDosTimes[index]}{' '}
              {index === 0 && <FaVolleyballBall size={18} title="Começa com a bola" />}
              {index === 1 && <GiTennisCourt size={18} title="Escolhe lado da quadra" />}
            </h3>
            <ul>
              {time.map(({ nome, posicao }, i) => (
                <li key={i} style={{ fontFamily: 'monospace' }}>
                  <span style={{ display: 'inline-block', width: '100px' }}>
                    {nome.replace(/^-/, '').trim().toUpperCase()}
                  </span>
                  – <strong>{posicao}</strong>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {listaDeEspera.length > 0 && (
        <div className="waiting-list">
          <div className="team-card">
          <h2 className="subtitle">Lista de Espera</h2>
          <ul>
            {listaDeEspera.map((jogador, index) => (
              <li key={index} style={{ fontFamily: 'monospace' }}>
                {jogador.toUpperCase()}
              </li>
            ))}
          </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sorteio;
