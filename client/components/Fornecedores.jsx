import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Fornecedores.css";
import {
  Package,
  ArrowDown,
  ArrowUp,
  Users,
  Truck,
  LifeBuoy,
  MessageSquare,
  Warehouse,
  Menu,
} from "lucide-react";

export default function Fornecedores({ onChangePage }) {
  const [fornecedores, setFornecedores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ nome: "", cnpj: "", status: "Ativo" });
  const [editandoId, setEditandoId] = useState(null);

  const fetchFornecedores = async () => {
    try {
      const response = await axios.get("http://localhost:3000/suppliers");
      setFornecedores(response.data);
    } catch (error) {
      console.error("Erro ao buscar fornecedores:", error);
    }
  };

  useEffect(() => {
    fetchFornecedores();
  }, []);

  const handleEditFornecedor = (id) => {
    const fornecedor = fornecedores.find(f => f._id === id);
    setFormData({ nome: fornecedor.nome, cnpj: fornecedor.cnpj, status: fornecedor.status });
    setEditandoId(id);
    setShowModal(true);
  };

  const handleAddFornecedor = () => {
    setFormData({ nome: "", cnpj: "", status: "Ativo" });
    setEditandoId(null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editandoId) {
        await axios.put(`http://localhost:3000/suppliers/${editandoId}`, formData);
      } else {
        await axios.post("http://localhost:3000/suppliers", formData);
      }

      setShowModal(false);
      fetchFornecedores(); // Atualiza a lista
    } catch (error) {
      console.error("Erro ao salvar fornecedor:", error);
    }
  };

  return (
    <div className="home-container">
      <aside className="sidebar">
        <div className="sidebar-title">
          <Menu /> Estoque Bebidas
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => onChangePage("gestaoProdutos")}><Package /> Produtos</button>
          <button onClick={() => onChangePage('estoque')}><Warehouse /> Estoque</button>
          <button onClick={() => onChangePage("entradas")}><ArrowDown /> Entradas</button>
          <button onClick={() => onChangePage("saidas")}><ArrowUp /> Saídas</button>
          <button onClick={() => onChangePage("clientes")}><Users /> Clientes</button>
          <button className="active" onClick={() => onChangePage("fornecedores")}><Truck /> Fornecedores</button>
          <button onClick={() => onChangePage("suporte")}><LifeBuoy /> Suporte</button>
          <button onClick={() => onChangePage("feedback")}><MessageSquare /> Feedback</button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="section-wrapper header">
          <h1>Fornecedores</h1>
          <div>
            <span onClick={() => onChangePage("home")} style={{ cursor: "pointer" }}>Início</span>
            <span>Fornecedores</span>
          </div>
        </header>

        <section className="section-wrapper">
          <h2>Gestão de Fornecedores</h2>

          <div className="card-list">
            {fornecedores.length > 0 ? (
              fornecedores.map((fornecedor) => (
                <div key={fornecedor._id} className="card card-shadow">
                  <div className="card-header">
                    <h3>{fornecedor.nome}</h3>
                  </div>
                  <div className="card-body">
                    <p><strong>CNPJ:</strong> {fornecedor.cnpj}</p>
                    <p><strong>Status:</strong> <span className={fornecedor.status === "Ativo" ? "text-green" : "text-red"}>{fornecedor.status}</span></p>
                  </div>
                  <div className="card-footer">
                    <button className="btn btn-edit" onClick={() => handleEditFornecedor(fornecedor._id)}>Editar</button>
                  </div>
                </div>
              ))
            ) : (
              <p>Carregando fornecedores...</p>
            )}
          </div>

        </section>

        <section className="section-wrapper">
          <button className="add-button" onClick={handleAddFornecedor}>
            Adicionar Fornecedor
          </button>
        </section>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>{editandoId ? "Editar Fornecedor" : "Adicionar Fornecedor"}</h3>
              <form onSubmit={handleSubmit}>
                <label>Nome:</label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
                <label>CNPJ:</label>
                <input
                  type="text"
                  value={formData.cnpj}
                  onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                  required
                />
                <label>Status:</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
                <div style={{ marginTop: "1rem" }}>
                  <button type="submit" className="edit-button" style={{ marginRight: "1rem" }}>
                    Salvar
                  </button>
                  <button type="button" className="add-button" onClick={() => setShowModal(false)}>
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
}
