import React, { useState } from 'react';
import '../App.css';

export default function Register({ onChangePage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (username && password) {
      alert('Usuário cadastrado com sucesso!');
      onChangePage('login');
    } else {
      alert('Preencha todos os campos!');
    }
  };

  return (
    <div className="container">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
        <p>
          Já tem uma conta?{' '}
          <span className="link" onClick={() => onChangePage('login')}>Entrar</span>
        </p>
      </form>
    </div>
  );
}
