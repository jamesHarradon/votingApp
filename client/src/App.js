import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './styles/App.css'
import './styles/normalise.css'
import './styles/styleReset.css'
import Login from './components/login/Login';
import Main from './components/main/Main';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';


function App() {

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Topbar />
        <Main />
      </div>
    </Router>
  );
}

export default App;
