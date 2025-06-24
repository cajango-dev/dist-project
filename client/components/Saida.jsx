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
import "./Entradas.css";

export default function Saidas({ onChangePage }) {
  const [saidas, setSaidas] = useState([]);
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [data, setData] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!produto || !quantidade || !data) return;

    const novaSaida = {
      id: Date.now(),
      produto,
      quantidade,
      data,
    };
    setSaidas((prev) => [...prev, novaSaida]);
    setProduto("");
    setQuantidade("");
    setData("");
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
          <button className="active" onClick={() => onChangePage('saidas')}><ArrowUp /> Saída</button>
          <button onClick={() => onChangePage("mesas")}> <Layout /> Mesas</button>
          <button onClick={() => onChangePage("clientes")}><Users /> Clientes</button>
          <button onClick={() => onChangePage('fornecedores')}><Truck /> Fornecedores</button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="section-wrapper header">
          <h1>Saídas de Produtos</h1>
          <div>
            <span className="voltar-link" onClick={() => onChangePage("home")}>
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
            <input
              type="date"
              placeholder="Data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
            <button type="submit" className="add-button">Registrar</button>
          </form>
        </section>

        <section className="section-wrapper">
          <h2>Histórico de Saídas</h2>
          <div className="card-list">
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
