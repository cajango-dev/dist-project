import React, { useState } from 'react';
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
import './Clientes.css';

const Clientes = ({ onChangePage }) => {
  const [clientes, setClientes] = useState([
    { id: 1, nome: 'João Silva', email: 'joao@exemplo.com', status: 'Ativo' },
    { id: 2, nome: 'Maria Souza', email: 'maria@exemplo.com', status: 'Ativo' },
    { id: 3, nome: 'Carlos Pereira', email: 'carlos@exemplo.com', status: 'Inativo' },
    { id: 4, nome: 'Ana Lima', email: 'ana@exemplo.com', status: 'Ativo' },
    { id: 5, nome: 'Lucas Rocha', email: 'lucas@exemplo.com', status: 'Inativo' },
    { id: 6, nome: 'Fernanda Torres', email: 'fernanda@exemplo.com', status: 'Ativo' }
  ]);

  const [form, setForm] = useState({ id: null, nome: '', email: '', status: 'Ativo' });
  const [modoEdicao, setModoEdicao] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome || !form.email) {
      return alert('Preencha todos os campos.');
    }

    if (modoEdicao) {
      setClientes((prev) =>
        prev.map((c) => (c.id === form.id ? { ...form } : c))
      );
    } else {
      const novoCliente = { ...form, id: Date.now() };
      setClientes((prev) => [...prev, novoCliente]);
    }

    setForm({ id: null, nome: '', email: '', status: 'Ativo' });
    setModoEdicao(false);
    setShowModal(false);
  };

  const editarCliente = (cliente) => {
    setForm(cliente);
    setModoEdicao(true);
    setShowModal(true);
  };

  const excluirCliente = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      setClientes((prev) => prev.filter((c) => c.id !== id));
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
          <button onClick={() => onChangePage('estoque')}><Warehouse /> Estoque</button>
          <button onClick={() => onChangePage('entradas')}><ArrowDown /> Entradas</button>
          <button onClick={() => onChangePage('saidas')}><ArrowUp /> Saídas</button>
          <button className="active" onClick={() => onChangePage('clientes')}><Users /> Clientes</button>
          <button onClick={() => onChangePage('fornecedores')}><Truck /> Fornecedores</button>
          <button onClick={() => onChangePage('suporte')}><LifeBuoy /> Suporte</button>
          <button onClick={() => onChangePage('feedback')}><MessageSquare /> Feedback</button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="section-wrapper header">
          <h1>Clientes</h1>
          <div>
            <span className="voltar-link" onClick={() => onChangePage("home")}>
              Início
            </span>
            <span>Clientes</span>
          </div>
        </header>

        <section className="section-wrapper">
          <h2>Gestão de Clientes</h2>
          <button className="add-button" onClick={() => {
            setForm({ id: null, nome: '', email: '', status: 'Ativo' });
            setModoEdicao(false);
            setShowModal(true);
          }}>
            Adicionar Cliente
          </button>

          <div className="card-list">
            {clientes.map((c) => (
              <div key={c.id} className="card card-shadow">
                <div className="card-header">
                  <h3>{c.nome}</h3>
                </div>
                <div className="card-body">
                  <p><strong>Email:</strong> {c.email}</p>
                  <p><strong>Status:</strong> <span className={c.status === "Ativo" ? "text-green" : "text-red"}>{c.status}</span></p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-edit" onClick={() => editarCliente(c)}>Editar</button>
                  <button className="btn btn-delete" onClick={() => excluirCliente(c.id)}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>{modoEdicao ? 'Editar Cliente' : 'Adicionar Cliente'}</h3>
              <form onSubmit={handleSubmit}>
                <label>Nome:</label>
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome do cliente"
                  value={form.nome}
                  onChange={handleChange}
                  required
                />
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <label>Status:</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="dropdown-categoria"
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
                <div style={{ marginTop: "1rem" }}>
                  <button type="submit" className="edit-button" style={{ marginRight: "1rem" }}>
                    {modoEdicao ? 'Salvar Edição' : 'Adicionar Cliente'}
                  </button>
                  <button type="button" className="add-button" onClick={() => {
                    setShowModal(false);
                    setModoEdicao(false);
                    setForm({ id: null, nome: '', email: '', status: 'Ativo' });
                  }}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Clientes;
