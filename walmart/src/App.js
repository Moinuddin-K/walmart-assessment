// App.js
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import ItemSearchPage from './pages/ItemSearchPage';
import ItemCreatePage from './pages/ItemCreatePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <nav>
          <Link to="/">Search</Link> | <Link to="/create">Create Item</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ItemSearchPage />} />
          <Route path="/create" element={<ItemCreatePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
