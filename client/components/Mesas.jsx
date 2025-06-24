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
  Layout
} from "lucide-react";
import "./Mesas.css";

export default function Mesas({ onChangePage }) {
  const [mesas, setMesas] = useState([
    { id: 1, numero: "01", cliente: "João", valor: "10,00", status: "Disponível" },
    { id: 2, numero: "02", cliente: "Maria", valor: "25,50", status: "Ocupada" },
    { id: 3, numero: "03", cliente: "", valor: "", status: "Disponível" }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ numero: "", cliente: "", valor: "", status: "Disponível" });
  const [editandoId, setEditandoId] = useState(null);

  const handleAddMesa = () => {
    setFormData({ numero: "", cliente: "", valor: "", status: "Disponível" });
    setEditandoId(null);
    setShowModal(true);
  };

  const handleEditMesa = (id) => {
    const mesa = mesas.find((m) => m.id === id);
    setFormData({ numero: mesa.numero, cliente: mesa.cliente, valor: mesa.valor, status: mesa.status });
    setEditandoId(id);
    setShowModal(true);
  };

  const handleFecharMesa = (id) => {
    setTimeout(() => {
      setMesas((prev) => prev.filter((m) => m.id !== id));
    }, 2000); // Altere este valor (2000 = 2 segundos) para ajustar o tempo de desaparecimento
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editandoId !== null) {
      setMesas((prev) =>
        prev.map((m) => (m.id === editandoId ? { ...formData, id: m.id } : m))
      );
    } else {
      setMesas((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <div className="home-container">
      <aside className="sidebar">
        <div className="sidebar-title">
          <Menu /> Estoque Bebidas
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => onChangePage("gestaoProdutos")}> <Package /> Produtos</button>
          <button onClick={() => onChangePage("estoque")}> <Warehouse /> Estoque</button>
          <button onClick={() => onChangePage("entradas")}> <ArrowDown /> Entradas</button>
          <button onClick={() => onChangePage("entradas")}> <ArrowUp /> Saida</button>
          <button className="menu-button" onClick={() => onChangePage("mesas")}> <Layout style={{ marginRight: "8px" }} /> Mesas</button>
          <button onClick={() => onChangePage("clientes")}> <Users /> Clientes</button>
          <button onClick={() => onChangePage("fornecedores")}> <Truck /> Fornecedores</button>

        </nav>
      </aside>

      <main className="main-content">
        <header className="section-wrapper header">
          <h1>Mesas</h1>
          <div>
            <span onClick={() => onChangePage("home")} style={{ cursor: "pointer" }}>Início</span>
            <span>Mesas</span>
          </div>
        </header>

        <section className="section-wrapper">
          <h2>Gestão de Mesas</h2>

          <div className="card-list">
            {mesas.map((mesa) => (
              <div key={mesa.id} className="card card-shadow">
                <div className="card-header">
                  <h3>Mesa {mesa.numero}</h3>
                </div>
                <div className="card-body">
                  <p><strong>Cliente:</strong> {mesa.cliente || "-"}</p>
                  <p><strong>Valor Total:</strong> R$ {mesa.valor || "0,00"}</p>
                  <p><strong>Status:</strong> <span className={mesa.status === "Disponível" ? "text-green" : "text-red"}>{mesa.status}</span></p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-edit" onClick={() => handleEditMesa(mesa.id)}>Editar</button>
                  <button className="btn btn-edit" onClick={() => handleFecharMesa(mesa.id)} style={{ marginLeft: "1rem" }}>Fechar Comanda</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-wrapper">
          <button className="add-button" onClick={handleAddMesa}>
            Adicionar Mesa
          </button>
        </section>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>{editandoId !== null ? "Editar Mesa" : "Adicionar Mesa"}</h3>
              <form onSubmit={handleSubmit}>
                <label>Número da Mesa:</label>
                <input
                  type="text"
                  value={formData.numero}
                  onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                  required
                />
                <label>Nome do Cliente:</label>
                <input
                  type="text"
                  value={formData.cliente}
                  onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                />
                <label>Valor Total (R$):</label>
                <input
                  type="text"
                  value={formData.valor}
                  onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                />
                <label>Status:</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Disponível">Disponível</option>
                  <option value="Ocupada">Ocupada</option>
                </select>
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
