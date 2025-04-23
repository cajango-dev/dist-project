import React, { useState } from 'react';
import '../App.css';

export default function Login({ onLogin, onChangePage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="container">
      <h2>Login</h2>
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
        <button type="submit">Entrar</button>
        <p>
          Não tem conta?{' '}
          <span className="link" onClick={() => onChangePage('register')}>
            Cadastre-se
          </span>
        </p>
      </form>
    </div>
  );
}
