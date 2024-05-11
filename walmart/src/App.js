import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ItemSearchPage from "./pages/ItemSearchPage";
import ItemCreatePage from "./pages/ItemCreatePage";

function App() {
  return (
    <Router>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Walmart Inventory
            </Typography>
            <Button color="inherit" component={RouterLink} to="/">
              Search
            </Button>
            <Button color="inherit" component={RouterLink} to="/create">
              Create Item
            </Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<ItemSearchPage />} />
          <Route path="/create" element={<ItemCreatePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
