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
  Warehouse,
  MessageSquare
} from 'lucide-react';
import './Estoque.css'; 

const Estoque = ({ onChangePage }) => {
  const [estoque, setEstoque] = useState([]);
  const [form, setForm] = useState({ id: null, produto: '', quantidade: '', local: '' });
  const [modoEdicao, setModoEdicao] = useState(false);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/estoque')
      .then((res) => setEstoque(res.data))
      .catch((err) => console.error('Erro ao buscar estoque:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.produto || !form.quantidade || !form.local) {
      return alert('Preencha todos os campos.');
    }

    if (modoEdicao) {
      if (window.confirm('Confirmar edição do item de estoque?')) {
        setEstoque((prev) =>
          prev.map((item) =>
            item.id === form.id ? { ...form, quantidade: +form.quantidade } : item
          )
        );
        setModoEdicao(false);
      }
    } else {
      const novoItem = {
        ...form,
        id: Date.now(),
        quantidade: +form.quantidade,
      };
      setEstoque((prev) => [...prev, novoItem]);
    }

    setForm({ id: null, produto: '', quantidade: '', local: '' });
  };

  const editarItem = (item) => {
    setForm(item);
    setModoEdicao(true);
  };

  const excluirItem = (id) => {
    if (window.confirm('Deseja remover este item do estoque?')) {
      setEstoque((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const estoqueFiltrado = estoque.filter((item) =>
    item.produto.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="home-container">
      <aside className="sidebar">
        <div className="sidebar-title">
          <Menu /> Estoque Bebidas
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => onChangePage('gestaoProdutos')}><Package /> Produtos</button>
          <button onClick={() => onChangePage('estoque')}><Warehouse /> Estoque </button>
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
          <h1>Estoque</h1>
          <div>
            <span className="voltar-link" onClick={() => onChangePage("home")}>Início</span>
            <span>Conta</span>
          </div>
        </header>

        <input
          type="text"
          placeholder="Pesquisar produto..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{ padding: '0.6rem', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '1rem', width: '100%' }}
        />

        <form className="form-produto" onSubmit={handleSubmit}>
          <input
            type="text"
            name="produto"
            placeholder="Nome do produto"
            value={form.produto}
            onChange={handleChange}
          />
          <input
            type="number"
            name="quantidade"
            placeholder="Quantidade"
            value={form.quantidade}
            onChange={handleChange}
          />
          <input
            type="text"
            name="local"
            placeholder="Local de Armazenamento"
            value={form.local}
            onChange={handleChange}
          />
          <button type="submit">
            {modoEdicao ? 'Salvar Edição' : 'Adicionar ao Estoque'}
          </button>
        </form>

        <table className="tabela-produtos">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Local</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {estoqueFiltrado.map((item) => (
              <tr key={item.id}>
                <td>{item.produto}</td>
                <td>{item.quantidade}</td>
                <td>{item.local}</td>
                <td>
                  <button className="editar" onClick={() => editarItem(item)}>Editar</button>
                  <button className="excluir" onClick={() => excluirItem(item.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Estoque;
