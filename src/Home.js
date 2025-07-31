import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getBestTeamDivision } from './utils/getBestTeamDivision';
import './App.css';

function Home() {
  const navigate = useNavigate();
  const [namesText, setNamesText] = useState('');

  const handleSortear = () => {
    const names = namesText
      .split('\n')
      .map(n => n.trim().replace(/^-/, '').toUpperCase())
      .filter(n => n.length > 0);

    if (names.length < 4) {
      alert('Número de jogadores insuficiente para formar pelo menos dois times.');
      return;
    }

    const melhorDivisao = getBestTeamDivision(names);
    const { teamSize, numTeams } = melhorDivisao;

    const shuffled = [...names].sort(() => Math.random() - 0.5);

    const times = [];
    const listaDeEspera = [];

    for (let i = 0; i < numTeams * teamSize; i += teamSize) {
      times.push(shuffled.slice(i, i + teamSize));
    }

    // Adiciona os que sobraram na lista de espera
    listaDeEspera.push(...shuffled.slice(numTeams * teamSize));

    navigate('/sorteio', {
      state: {
        times,
        teamSize,
        totalPlayers: names.length,
        melhorDivisao,
        listaDeEspera
      }
    });
  };

  return (
    <div className="App">
      <h1 className="title">Roulette Volleyball</h1>

      <div className="form-container">
        <label htmlFor="players" style={{ fontWeight: 'bold' }}>
          Lista de Jogadores
        </label>
        <textarea
          id="players"
          className="text-area"
          placeholder="Cole aqui a lista de pessoas"
          value={namesText}
          onChange={(e) => setNamesText(e.target.value)}
        ></textarea>

        <button className="btn" style={{ fontWeight: 'bold' }} onClick={handleSortear}>
          Sortear
        </button>
      </div>
    </div>
  );
}

export default Home;
