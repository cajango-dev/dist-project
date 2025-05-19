import React from 'react';
import "./Home.css";
import {
  Package,
  ArrowDown,
  ArrowUp,
  Users,
  Truck,
  LifeBuoy,
  MessageSquare,
  Menu,
  Warehouse,
} from "lucide-react";

export default function Home({ onChangePage }) {
  return (
    <div className="home-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-title">
          <Menu /> Estoque Bebidas
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => onChangePage('gestaoProdutos')}>
            <Package /> Produtos
          </button>
          <button onClick={() => onChangePage("estoque")}>
            <Warehouse /> Estoque
          </button>
          <button>
            <ArrowDown /> Entradas
          </button>
          <button>
            <ArrowUp /> Saídas
          </button>
          <button>
            <Users /> Clientes
          </button>
          <button onClick={() => onChangePage("fornecedores")}>
            <Truck /> Fornecedores
          </button>
          <button>
            <LifeBuoy /> Suporte
          </button>
          <button>
            <MessageSquare /> Feedback
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <header className="section-wrapper header">
          <h1>Dashboard</h1>
          <div>
            <span>Início</span>
            <span>Conta</span>
          </div>
        </header>

        {/* Cards */}
        <section className="section-wrapper cards">
          <div className="card">
            <p className="text-yellow">Produtos com estoque baixo</p>
            <p className="number">0</p>
          </div>
          <div className="card">
            <p className="text-blue">Quantidade de produtos no estoque</p>
            <p className="number">1122</p>
          </div>
          <div className="card">
            <p className="text-green">Custo total de produtos</p>
            <p className="number">R$ 0</p>
          </div>
        </section>

        {/* Shortcuts */}
        <section className="section-wrapper">
          <h2>Atalhos</h2>
          <div className="shortcuts">
            <div className="card shortcut" onClick={() => onChangePage("gestaoProdutos")}>
              <Package size={32} />
              <p>Produtos</p>
            </div>
            <div className="card shortcut">
              <ArrowDown size={32} />
              <p>Entradas</p>
            </div>
            <div className="card shortcut">
              <ArrowUp size={32} />
              <p>Saídas</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
