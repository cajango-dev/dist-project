import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Menu,
  Package,
  ArrowDown,
  ArrowUp,
  Users,
  Truck,
  LifeBuoy,
  MessageSquare
} from 'lucide-react';
import './GestaoProdutos.css';

const GestaoProdutos = ({ onChangePage }) => {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({ id: null, nome: '', categoria: '', estoque: '', preco: '' });
  const [modoEdicao, setModoEdicao] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/products') 
      .then((res) => {
        setProdutos(res.data); 
      })
      .catch((err) => {
        console.error('Erro ao buscar produtos:', err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nome || !form.categoria || !form.estoque || !form.preco) {
      return alert('Preencha todos os campos.');
    }

    if (modoEdicao) {
      if (window.confirm('Tem certeza que deseja editar este produto?')) {
        setProdutos((prev) =>
          prev.map((p) =>
            p.id === form.id ? { ...form, estoque: +form.estoque, preco: +form.preco } : p
          )
        );
        setModoEdicao(false);
      }
    } else {
      const novoProduto = {
        ...form,
        id: Date.now(),
        estoque: +form.estoque,
        preco: +form.preco,
      };
      setProdutos((prev) => [...prev, novoProduto]);
    }

    setForm({ id: null, nome: '', categoria: '', estoque: '', preco: '' });
  };

  const editarProduto = (produto) => {
    setForm(produto);
    setModoEdicao(true);
  };

  const excluirProduto = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProdutos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="home-container">
      <aside className="sidebar">
        <div className="sidebar-title">
          <Menu /> Estoque Bebidas
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => onChangePage('gestaoProdutos')}><Package /> Produtos</button>
          <button onClick={() => onChangePage('entradas')}><ArrowDown /> Entradas</button>
          <button onClick={() => onChangePage('saidas')}><ArrowUp /> Saídas</button>
          <button onClick={() => onChangePage('clientes')}><Users /> Clientes</button>
          <button onClick={() => onChangePage('fornecedores')}><Truck /> Fornecedores</button>
          <button onClick={() => onChangePage('suporte')}><LifeBuoy /> Suporte</button>
          <button onClick={() => onChangePage('feedback')}><MessageSquare /> Feedback</button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="section-wrapper header">
          <h1>Produtos</h1>
          <div>
            <span className="voltar-link" onClick={() => onChangePage("home")}>
              Início
            </span>
            <span>Conta</span>
          </div>
        </header>

        <form className="form-produto" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Nome do produto"
            value={form.nome}
            onChange={handleChange}
          />
          <input
            type="text"
            name="categoria"
            placeholder="Categoria"
            value={form.categoria}
            onChange={handleChange}
          />
          <input
            type="number"
            name="estoque"
            placeholder="Quantidade"
            value={form.estoque}
            onChange={handleChange}
          />
          <input
            type="number"
            step="0.01"
            name="preco"
            placeholder="Preço"
            value={form.preco}
            onChange={handleChange}
          />
          <button type="submit">
            {modoEdicao ? 'Salvar Edição' : 'Adicionar Produto'}
          </button>
        </form>

        <table className="tabela-produtos">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Quantidade</th>
              <th>Preço (R$)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.categoria}</td>
                <td>{p.estoque}</td>
                <td>{p.preco.toFixed(2)}</td>
                <td>
                  <button className="editar" onClick={() => editarProduto(p)}>Editar</button>
                  <button className="excluir" onClick={() => excluirProduto(p.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default GestaoProdutos;
