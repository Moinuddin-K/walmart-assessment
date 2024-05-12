import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ItemSearchPage from "./pages/ItemSearchPage";
import ItemCreatePage from "./pages/ItemCreatePage";
import Header from './components/Header'

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<ItemSearchPage />} />
          <Route path="/create" element={<ItemCreatePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
