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
import './GestaoProdutos.css';

const GestaoProdutos = ({ onChangePage }) => {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({ id: null, nome: '', categoria: '', estoque: '', preco: '' });
  const [modoEdicao, setModoEdicao] = useState(false);

  // Filtros
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');

  useEffect(() => {
    // Buscar produtos do backend
    axios.get('http://localhost:3000/products')
      .then((res) => {
        setProdutos(res.data);

        const categoriasUnicas = [
          ...new Set(res.data.map((produto) => produto.categoria).filter(Boolean))
        ];
        setCategorias(categoriasUnicas);
      })
      .catch((err) => {
        console.error('Erro ao buscar produtos:', err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nome || !form.categoria || !form.preco || form.estoque === '') {
      return alert('Preencha todos os campos.');
    }

    try {
      if (modoEdicao) {
        // Atualizar no backend sem categoria pois não existe no banco
        await axios.put(`http://localhost:3000/products/${form.id}`, {
          nome: form.nome,
          preco: parseFloat(form.preco),
          estoque: parseInt(form.estoque, 10)
          // id_fornecedor pode ser adicionado se desejar
        });

        // Atualizar localmente
        setProdutos((prev) =>
          prev.map((p) =>
            p.id === form.id
              ? { ...p, nome: form.nome, preco: parseFloat(form.preco), estoque: parseInt(form.estoque, 10), categoria: form.categoria }
              : p
          )
        );

        setModoEdicao(false);
      } else {
        // Criar no backend
        const res = await axios.post('http://localhost:3000/products', {
          nome: form.nome,
          preco: parseFloat(form.preco),
          quantidade_estoque: parseInt(form.estoque, 10),
          id_fornecedor: 1 // Ajuste conforme necessário
        });

        const novoProduto = {
          id: res.data.data[0].id_produto,
          nome: form.nome,
          preco: parseFloat(form.preco),
          estoque: parseInt(form.estoque, 10),
          categoria: form.categoria
        };

        setProdutos((prev) => [...prev, novoProduto]);

        if (!categorias.includes(form.categoria)) {
          setCategorias((prev) => [...prev, form.categoria]);
        }
      }

      setForm({ id: null, nome: '', categoria: '', estoque: '', preco: '' });
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert('Erro ao salvar produto. Veja o console para detalhes.');
    }
  };

  const editarProduto = (produto) => {
    setForm({
      id: produto.id,
      nome: produto.nome,
      categoria: produto.categoria,
      estoque: produto.estoque,
      preco: produto.preco
    });
    setModoEdicao(true);
  };

  const excluirProduto = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await axios.delete(`http://localhost:3000/products/${id}`);
        setProdutos((prev) => prev.filter((p) => p.id !== id));
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
        alert('Erro ao excluir produto. Veja o console para detalhes.');
      }
    }
  };

  const produtosFiltrados = produtos.filter((p) => {
    const nomeMatch = p.nome.toLowerCase().includes(filtroNome.toLowerCase());
    const categoriaMatch = filtroCategoria ? p.categoria === filtroCategoria : true;
    return nomeMatch && categoriaMatch;
  });

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
          <button onClick={() => onChangePage('clientes')}><Users /> Clientes</button>
          <button onClick={() => onChangePage('fornecedores')}><Truck /> Fornecedores</button>

        </nav>
      </aside>

      <main className="main-content">
        <header className="section-wrapper header">
          <h1>Produtos</h1>
          <div>
            <span className="voltar-link" onClick={() => onChangePage("home")}>
              Início
            </span>
            <span>Produtos</span>
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
          <select
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            className="dropdown-categoria"
          >
            <option value="">Categoria</option>
            {categorias.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="number"
            name="estoque"
            placeholder="Estoque"
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

        <div className="filtro-container" style={{ marginTop: 20, marginBottom: 20 }}>
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            style={{ padding: '5px' }}
          >
            <option value="">Todos</option>
            {categorias.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <table className="tabela-produtos">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Estoque</th>
              <th>Preço (R$)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.map((p) => (
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
