// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/Home';
import Sorteio from '../src/Sorteio';

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
