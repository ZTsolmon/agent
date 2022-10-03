import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes,Route, NavLink } from 'react-router-dom';
import Home from './Home'

function App() {
  return (

    <Routes>
      
        <Route index element={<Home />} />
      
    </Routes>
  );
}

export default App;
