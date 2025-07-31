// src/App.js
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Sorteio from './Sorteio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sorteio" element={<Sorteio />} />
      </Routes>
    </Router>
  );
}

export default App;
