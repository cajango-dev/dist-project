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
  MessageSquare,
  Layout,
} from 'lucide-react';
import './Clientes.css';

const Clientes = ({ onChangePage }) => {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nome: '',
    email: '',
    status: 'Ativo',
    cpf: '',
    telefone: ''
  });
  const [modoEdicao, setModoEdicao] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/cliente')
      .then(res => setClientes(res.data))
      .catch(err => console.error('Erro ao carregar clientes:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nome || !form.email) {
      return alert('Preencha todos os campos.');
    }

    try {
      if (modoEdicao) {
        await axios.put(`http://localhost:3000/cliente/${form.id}`, form);
        setClientes(prev => prev.map(c => (c.id_cliente === form.id ? { ...form, id_cliente: form.id } : c)));
      } else {
        const res = await axios.post('http://localhost:3000/cliente', form);
        setClientes(prev => [...prev, res.data]);
      }
      setForm({ id: null, nome: '', email: '', status: 'Ativo', cpf: '', telefone: '' });
      setModoEdicao(false);
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      alert('Erro ao salvar cliente. Veja o console para detalhes.');
    }
  };

  const editarCliente = (cliente) => {
    setForm({
      id: cliente.id_cliente,
      nome: cliente.nome,
      email: cliente.email,
      status: cliente.status || 'Ativo',
      cpf: cliente.cpf || '',
      telefone: cliente.telefone || ''
    });
    setModoEdicao(true);
    setShowModal(true);
  };

  const excluirCliente = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await axios.delete(`http://localhost:3000/cliente/${id}`);
        setClientes(prev => prev.filter(c => c.id_cliente !== id));
      } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        alert('Erro ao excluir cliente. Veja o console para detalhes.');
      }
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
          <button onClick={() => onChangePage("entradas")}> <ArrowDown /> Entradas</button>
          <button onClick={() => onChangePage("saidas")}> <ArrowUp /> Saida</button>
          <button onClick={() => onChangePage("mesas")}> <Layout /> Mesas</button>
          <button className="active" onClick={() => onChangePage('clientes')}><Users /> Clientes</button>
          <button onClick={() => onChangePage('fornecedores')}><Truck /> Fornecedores</button>

        </nav>
      </aside>

      <main className="main-content">
        <header className="section-wrapper header">
          <h1>Clientes</h1>
          <div>
            <span className="voltar-link" onClick={() => onChangePage("home")}>Início</span>
            <span>Clientes</span>
          </div>
        </header>

        <section className="section-wrapper">
          <h2>Gestão de Clientes</h2>
          <button className="add-button" onClick={() => {
            setForm({ id: null, nome: '', email: '', status: 'Ativo', cpf: '', telefone: '' });
            setModoEdicao(false);
            setShowModal(true);
          }}>
            Adicionar Cliente
          </button>

          <div className="card-list">
            {clientes.map((c) => (
              <div key={c.id_cliente} className="card card-shadow">
                <div className="card-header">
                  <h3>{c.nome}</h3>
                </div>
                <div className="card-body">
                  <p><strong>Email:</strong> {c.email}</p>
                  <p>
                    <strong>Status:</strong> <span className={c.status === "Ativo" ? "text-green" : "text-red"}>
                      {c.status || 'Ativo'}
                    </span>
                  </p>
                  <p><strong>CPF:</strong> {c.cpf || '-'}</p>
                  <p><strong>Telefone:</strong> {c.telefone || '-'}</p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-edit" onClick={() => editarCliente(c)}>Editar</button>
                  <button className="btn btn-delete" onClick={() => excluirCliente(c.id_cliente)}>Excluir</button>
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
                <label>CPF:</label>
                <input
                  type="text"
                  name="cpf"
                  placeholder="CPF"
                  value={form.cpf}
                  onChange={handleChange}
                />
                <label>Telefone:</label>
                <input
                  type="text"
                  name="telefone"
                  placeholder="Telefone"
                  value={form.telefone}
                  onChange={handleChange}
                />
                <div style={{ marginTop: "1rem" }}>
                  <button type="submit" className="edit-button" style={{ marginRight: "1rem" }}>
                    {modoEdicao ? 'Salvar Edição' : 'Adicionar Cliente'}
                  </button>
                  <button type="button" className="add-button" onClick={() => {
                    setShowModal(false);
                    setModoEdicao(false);
                    setForm({ id: null, nome: '', email: '', status: 'Ativo', cpf: '', telefone: '' });
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
