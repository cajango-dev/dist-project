import React, { useState } from "react";
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
  Layout,
  ShoppingBag,
} from "lucide-react";
import "./Entradas.css";

export default function Entradas({ onChangePage }) {
  const [entradas, setEntradas] = useState([
    { id: 1, produto: "Cerveja Heineken 600ml", quantidade: 50, data: "2024-06-01" },
    { id: 2, produto: "Vodka Smirnoff 998ml", quantidade: 30, data: "2024-06-03" }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ produto: "", quantidade: "", data: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaEntrada = { ...formData, id: Date.now() };
    setEntradas((prev) => [...prev, novaEntrada]);
    setShowModal(false);
  };

  return (
    <div className="home-container">
      <aside className="sidebar">
        <div className="sidebar-title">
          <Menu /> Estoque Bebidas
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => onChangePage("compras")}><ShoppingBag /> Compras</button>
          <button onClick={() => onChangePage('gestaoProdutos')}><Package /> Produtos</button>
          <button onClick={() => onChangePage('estoque')}><Warehouse /> Estoque</button>
          <button className="active" onClick={() => onChangePage("entradas")}><ArrowDown /> Entradas</button>
          <button onClick={() => onChangePage("saidas")}> <ArrowUp /> Saida</button>
          <button onClick={() => onChangePage("mesas")}> <Layout /> Mesas</button>
          <button onClick={() => onChangePage("clientes")}><Users /> Clientes</button>
          <button onClick={() => onChangePage('fornecedores')}><Truck /> Fornecedores</button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="section-wrapper header">
          <h1>Entradas</h1>
          <div>
            <span onClick={() => onChangePage("home")} style={{ cursor: "pointer" }}>Início</span>
            <span>Entradas</span>
          </div>
        </header>

        <section className="section-wrapper">
          <h2>Controle de Entradas</h2>
          <div className="card-list">
            {entradas.map((entrada) => (
              <div key={entrada.id} className="card card-shadow">
                <div className="card-header">
                  <h3>{entrada.produto}</h3>
                </div>
                <div className="card-body">
                  <p><strong>Quantidade:</strong> {entrada.quantidade}</p>
                  <p><strong>Data:</strong> {entrada.data}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-wrapper">
          <button className="add-button" onClick={() => setShowModal(true)}>
            Adicionar Entrada
          </button>
        </section>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Nova Entrada</h3>
              <form onSubmit={handleSubmit}>
                <label>Produto:</label>
                <input
                  type="text"
                  value={formData.produto}
                  onChange={(e) => setFormData({ ...formData, produto: e.target.value })}
                  required
                />
                <label>Quantidade:</label>
                <input
                  type="number"
                  value={formData.quantidade}
                  onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
                  required
                />
                <label>Data:</label>
                <input
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  required
                />
                <div style={{ marginTop: "1rem" }}>
                  <button type="submit" className="edit-button" style={{ marginRight: "1rem" }}>Salvar</button>
                  <button type="button" className="add-button" onClick={() => setShowModal(false)}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}