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
import './Estoque.css';

const Estoque = ({ onChangePage }) => {
  const [estoque, setEstoque] = useState([]);
  const [form, setForm] = useState({ id: null, nome: '', estoque: '' });
  const [modoEdicao, setModoEdicao] = useState(false);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then((res) => setEstoque(res.data))
      .catch((err) => console.error('Erro ao buscar estoque:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nome || form.estoque === '') {
      return alert('Preencha os campos nome e estoque.');
    }

    try {
      if (modoEdicao) {
        if (window.confirm('Confirmar edição do produto?')) {
          await axios.put(`http://localhost:3000/products/${form.id}`, {
            nome: form.nome,
            estoque: Number(form.estoque),
          });
          setEstoque((prev) =>
            prev.map((item) =>
              item.id === form.id ? { ...form, estoque: Number(form.estoque) } : item
            )
          );
          setModoEdicao(false);
        }
      } else {
        const response = await axios.post('http://localhost:3000/products', {
          nome: form.nome,
          estoque: Number(form.estoque),
        });
        setEstoque((prev) => [...prev, response.data]);
      }
      setForm({ id: null, nome: '', estoque: '' });
    } catch (err) {
      console.error('Erro ao salvar produto:', err);
      alert('Erro ao salvar produto. Veja o console para detalhes.');
    }
  };

  const editarItem = (item) => {
    setForm({
      id: item.id,
      nome: item.nome,
      estoque: item.estoque.toString(),
    });
    setModoEdicao(true);
  };

  const excluirItem = async (id) => {
    if (window.confirm('Deseja remover este produto?')) {
      try {
        await axios.delete(`http://localhost:3000/products/${id}`);
        setEstoque((prev) => prev.filter((item) => item.id !== id));
      } catch (err) {
        console.error('Erro ao deletar produto:', err);
        alert('Erro ao deletar produto. Veja o console para detalhes.');
      }
    }
  };

  const estoqueFiltrado = estoque.filter((item) =>
    item.nome.toLowerCase().includes(filtro.toLowerCase())
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
          <button onClick={() => onChangePage("entradas")}> <ArrowDown /> Entradas</button>
          <button onClick={() => onChangePage("saidas")}> <ArrowUp /> Saida</button>
          <button onClick={() => onChangePage("mesas")}> <Layout /> Mesas</button>
          <button onClick={() => onChangePage('clientes')}><Users /> Clientes</button>
          <button onClick={() => onChangePage('fornecedores')}><Truck /> Fornecedores</button>

        </nav>
      </aside>

      <main className="main-content">
        <header className="section-wrapper header">
          <h1>Estoque</h1>
          <div>
            <span className="voltar-link" onClick={() => onChangePage("home")}>Início</span>
            <span>Estoque</span>
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
            name="nome"
            placeholder="Nome do produto"
            value={form.nome}
            onChange={handleChange}
          />
          <input
            type="number"
            name="estoque"
            placeholder="Quantidade em estoque"
            value={form.estoque}
            onChange={handleChange}
            min="0"
          />
          <button type="submit">
            {modoEdicao ? 'Salvar Edição' : 'Adicionar Produto'}
          </button>
        </form>

        <table className="tabela-produtos">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {estoqueFiltrado.map((item) => (
              <tr key={item.id}>
                <td>{item.nome}</td>
                <td>{item.estoque}</td>
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
