import React from 'react';
import '../App.css';

export default function Dashboard({ onChangePage }) {
  const username = 'Usuário'; // Substitua com dados reais no futuro

  const handleLogout = () => {
    onChangePage('login');
  };

  return (
    <div className="container">
      <h2>Bem-vindo, {username}!</h2>
      <p>Você está logado no sistema da conveniência 🍻</p>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}
