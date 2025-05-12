import React, { useState, useEffect } from "react";
import axios from "axios"; // Importando o axios para fazer requisições HTTP
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
  const [fornecedores, setFornecedores] = useState([]); // Estado para armazenar os fornecedores

  useEffect(() => {
    // Função para buscar fornecedores do back-end
    const fetchFornecedores = async () => {
      try {
        const response = await axios.get("http://localhost:3000/suppliers"); // URL back-end
        setFornecedores(response.data);
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
      }
    };

    fetchFornecedores(); 
  }, []);

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
            {fornecedores.length > 0 ? (
              fornecedores.map((fornecedor) => (
                <div key={fornecedor._id} className="card">
                  <h3>{fornecedor.nome}</h3>
                  <p>CNPJ: {fornecedor.cnpj}</p>
                  <p>Status: <span className={fornecedor.status === "Ativo" ? "text-green" : "text-red"}>{fornecedor.status}</span></p>
                  <button className="edit-button" onClick={() => handleEditFornecedor(fornecedor._id)}>
                    Editar
                  </button>
                </div>
              ))
            ) : (
              <p>Carregando fornecedores...</p>
            )}
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
