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
} from "lucide-react";
import "./Saida.css";

export default function Saidas({ onChangePage }) {
  const [saidas, setSaidas] = useState([]);
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!produto || !quantidade) return;

    const novaSaida = {
      id: Date.now(),
      produto,
      quantidade,
      data: new Date().toLocaleDateString(),
    };
    setSaidas((prev) => [...prev, novaSaida]);
    setProduto("");
    setQuantidade("");
  };

  return (
    <div className="home-container">
      <aside className="sidebar">
        <div className="sidebar-title">
          <Menu /> Estoque Bebidas
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => onChangePage("gestaoProdutos")}>
            <Package /> Produtos
          </button>
          <button onClick={() => onChangePage("estoque")}>
            <Warehouse /> Estoque
          </button>
          <button onClick={() => onChangePage("mesas")}> <Layout /> Mesas</button>
          <button onClick={() => onChangePage("entradas")}>
            <ArrowDown /> Entradas
          </button>
          <button className="active" onClick={() => onChangePage("saidas")}>
            <ArrowUp /> Saídas
          </button>
          <button onClick={() => onChangePage("clientes")}>
            <Users /> Clientes
          </button>
          <button onClick={() => onChangePage("fornecedores")}>
            <Truck /> Fornecedores
          </button>
          <button onClick={() => onChangePage("suporte")}>
            <LifeBuoy /> Suporte
          </button>
          <button onClick={() => onChangePage("feedback")}>
            <MessageSquare /> Feedback
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="section-wrapper header">
          <h1>Saídas de Produtos</h1>
          <div>
            <span onClick={() => onChangePage("home")} style={{ cursor: "pointer" }}>
              Início
            </span>
            <span>Saídas</span>
          </div>
        </header>

        <section className="section-wrapper">
          <h2>Registrar Saída</h2>
          <form onSubmit={handleSubmit} className="form-saida">
            <input
              type="text"
              placeholder="Nome do Produto"
              value={produto}
              onChange={(e) => setProduto(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Quantidade"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              required
            />
            <button type="submit">Registrar</button>
          </form>
        </section>

        <section className="section-wrapper">
          <h2>Histórico de Saídas</h2>
          <div className="saida-list">
            {saidas.length > 0 ? (
              saidas.map((item) => (
                <div key={item.id} className="card">
                  <div className="card-body">
                    <p><strong>Produto:</strong> {item.produto}</p>
                    <p><strong>Quantidade:</strong> {item.quantidade}</p>
                    <p><strong>Data:</strong> {item.data}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhuma saída registrada ainda.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
