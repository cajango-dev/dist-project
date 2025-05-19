import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Home from './components/Home'; 
import Fornecedores from './components/Fornecedores';
import GestaoProdutos from './components/GestaoProdutos';
import Estoque from './components/Estoque';
import './App.css';

function App() {
  const [page, setPage] = useState('login');

  const handleLogin = (username, password) => {
    if (username && password) {
      setPage('home'); 
    } else {
      alert('Preencha todos os campos!');
    }
  };

  return (
    <div className="app-container">
      {page === 'login' && (
        <Login onChangePage={setPage} onLogin={handleLogin} />
      )}
      {page === 'register' && (
        <Register onChangePage={setPage} />
      )}
      {page === 'dashboard' && (
        <Dashboard onChangePage={setPage} />
      )}
      {page === 'home' && (
        <Home onChangePage={setPage} /> 
      )}
      {page === 'fornecedores' && (
        <Fornecedores onChangePage={setPage} />
      )}
      {page === 'gestaoProdutos' && (
        <GestaoProdutos onChangePage={setPage} />
      )}
      {page === 'estoque' && (
        <Estoque onChangePage={setPage} />
      )}
      <div className="footer">Desenvolvido..</div>
    </div>
  );
}

export default App;