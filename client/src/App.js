import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import './App.css';
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
