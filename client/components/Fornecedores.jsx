import React from "react";
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
} from "lucide-react";

export default function Fornecedores({ onChangePage }) {
  const handleEditFornecedor = (id) => {
    console.log(`Editar fornecedor ID: ${id}`);
    // Aqui você pode abrir um modal ou redirecionar para tela de edição
  };

  const handleAddFornecedor = () => {
    console.log("Adicionar novo fornecedor");
    // Aqui você pode abrir um formulário/modal futuramente
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-title">
          <Menu /> Estoque Bebidas
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => onChangePage("gestaoProdutos")}>
            <Package /> Produtos
          </button>
          <button onClick={() => onChangePage("entradas")}>
            <ArrowDown /> Entradas
          </button>
          <button onClick={() => onChangePage("saidas")}>
            <ArrowUp /> Saídas
          </button>
          <button onClick={() => onChangePage("clientes")}>
            <Users /> Clientes
          </button>
          <button className="active" onClick={() => onChangePage("fornecedores")}>
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

      {/* Main content */}
      <main className="main-content">
        <header className="section-wrapper header">
          <h1>Fornecedores</h1>
          <div>
            <span
              onClick={() => onChangePage("home")}
              style={{ cursor: "pointer" }}
            >
              Início
            </span>
            <span>Fornecedores</span>
          </div>
        </header>

        <section className="section-wrapper">
          <h2>Gestão de Fornecedores</h2>
          <p>Visualize, edite e gerencie seus fornecedores de bebidas.</p>

          {/* Lista de Fornecedores */}
          <div className="card-list">
            <div className="card">
              <h3>Fornecedor 1</h3>
              <p>CNPJ: 12.345.678/0001-99</p>
              <p>Status: <span className="text-green">Ativo</span></p>
              <button className="edit-button" onClick={() => handleEditFornecedor(1)}>
                Editar
              </button>
            </div>
            <div className="card">
              <h3>Fornecedor 2</h3>
              <p>CNPJ: 98.765.432/0001-01</p>
              <p>Status: <span className="text-red">Inativo</span></p>
              <button className="edit-button" onClick={() => handleEditFornecedor(2)}>
                Editar
              </button>
            </div>
          </div>
        </section>

        {/* Adicionar Fornecedor */}
        <section className="section-wrapper">
          <button className="add-button" onClick={handleAddFornecedor}>
            Adicionar Fornecedor
          </button>
        </section>
      </main>
    </div>
  );
}
