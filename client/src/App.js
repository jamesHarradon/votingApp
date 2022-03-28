import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './styles/App.css'
import './styles/normalise.css'
import './styles/styleReset.css'
import Login from './components/login/Login';
import Main from './components/main/Main';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import { selectUser } from './userSlice';
import { useSelector } from "react-redux";


function App() {

  
  const user = useSelector(selectUser);
  const isUser = user ? true : false;

  return (
    <Router>
      <div className="App">
        <ErrorBoundary>
          {isUser ? 
          <>
            <Sidebar />
            <Topbar />
            <Main />
          </>
          :
          <Login />
          }
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
