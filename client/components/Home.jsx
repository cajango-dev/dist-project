import React, { useState } from "react";
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
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const todosProdutos = [
  { nome: "Cerveja Heineken 600ml", quantidade: 120, categoria: "Cervejas" },
  { nome: "Refrigerante Coca-Cola 2L", quantidade: 200, categoria: "Refrigerantes" },
  { nome: "Água Mineral sem Gás 500ml", quantidade: 180, categoria: "Outros" },
  { nome: "Cerveja Skol Lata 350ml", quantidade: 160, categoria: "Cervejas" },
  { nome: "Whisky Johnnie Walker Red Label 1L", quantidade: 40, categoria: "Destilados" },
  { nome: "Vodka Smirnoff 998ml", quantidade: 60, categoria: "Destilados" },
  { nome: "Suco de Laranja Natural One 900ml", quantidade: 85, categoria: "Outros" },
  { nome: "Energético Red Bull 250ml", quantidade: 95, categoria: "Outros" },
  { nome: "Cerveja Brahma Chopp 1L", quantidade: 110, categoria: "Cervejas" },
  { nome: "Guaraná Antarctica 350ml", quantidade: 150, categoria: "Refrigerantes" },
  { nome: "Espumante Chandon Brut 750ml", quantidade: 35, categoria: "Outros" },
  { nome: "Vinho Chileno Gato Negro 750ml", quantidade: 50, categoria: "Outros" },
  { nome: "Água Tônica Schweppes 350ml", quantidade: 70, categoria: "Outros" },
  { nome: "Cerveja Corona Extra 330ml", quantidade: 90, categoria: "Cervejas" },
  { nome: "Refrigerante Pepsi Twist 2L", quantidade: 130, categoria: "Refrigerantes" },
  { nome: "Catuaba Selvagem 1L", quantidade: 65, categoria: "Destilados" },
  { nome: "Ice Smirnoff Sabor Limão 275ml", quantidade: 45, categoria: "Destilados" },
  { nome: "Gin Tanqueray 750ml", quantidade: 38, categoria: "Destilados" },
  { nome: "Cerveja Stella Artois 550ml", quantidade: 77, categoria: "Cervejas" },
  { nome: "Refrigerante Sprite 600ml", quantidade: 125, categoria: "Refrigerantes" },
];

const categorias = ["Todos", "Cervejas", "Refrigerantes", "Destilados", "Outros"];

// Adicione logo abaixo de `const categorias = [...]`:
const dadosGrafico = [
  { nome: "Cerveja Heineken 600ml", quantidade: 300 },
  { nome: "Refrigerante Coca-Cola 2L", quantidade: 280 },
  { nome: "Água Mineral sem Gás 500ml", quantidade: 150 },
  { nome: "Cerveja Skol Lata 350ml", quantidade: 240 },
  { nome: "Whisky Johnnie Walker Red Label 1L", quantidade: 90 },
  { nome: "Vodka Smirnoff 998ml", quantidade: 100 },
  { nome: "Suco de Laranja Natural One 900ml", quantidade: 130 },
  { nome: "Energético Red Bull 250ml", quantidade: 180 },
  { nome: "Cerveja Brahma Chopp 1L", quantidade: 190 },
  { nome: "Guaraná Antarctica 350ml", quantidade: 170 },
  { nome: "Espumante Chandon Brut 750ml", quantidade: 70 },
  { nome: "Vinho Chileno Gato Negro 750ml", quantidade: 85 },
  { nome: "Água Tônica Schweppes 350ml", quantidade: 120 },
  { nome: "Cerveja Corona Extra 330ml", quantidade: 160 },
  { nome: "Refrigerante Pepsi Twist 2L", quantidade: 210 },
  { nome: "Catuaba Selvagem 1L", quantidade: 95 },
  { nome: "Ice Smirnoff Sabor Limão 275ml", quantidade: 80 },
  { nome: "Gin Tanqueray 750ml", quantidade: 60 },
  { nome: "Cerveja Stella Artois 550ml", quantidade: 140 },
  { nome: "Refrigerante Sprite 600ml", quantidade: 200 },
];

export default function Home({ onChangePage }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [dropdownAberto, setDropdownAberto] = useState(false);

  const dadosFiltrados =
    categoriaSelecionada === "Todos"
      ? todosProdutos
      : todosProdutos.filter((p) => p.categoria === categoriaSelecionada);

  const totalEstoque = dadosFiltrados.reduce((acc, item) => acc + item.quantidade, 0);
  const produtosBaixoEstoque = dadosFiltrados.filter((item) => item.quantidade < 150).length;
  const custoTotal = totalEstoque * 4.5;

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

      <main className="main-content">
        <header className="section-wrapper header">
          <h1>Dashboard</h1>
          <div>
            <span>Início</span>
            <span>Conta</span>
          </div>
        </header>

        <section className="section-wrapper cards">
          <div className="card">
            <p className="text-yellow">Produtos com estoque baixo</p>
            <p className="number">{produtosBaixoEstoque}</p>
          </div>
          <div className="card">
            <p className="text-blue">Quantidade total no estoque</p>
            <p className="number">{totalEstoque}</p>
          </div>
          <div className="card">
            <p className="text-green">Custo total estimado</p>
            <p className="number">R$ {custoTotal.toFixed(2)}</p>
          </div>
        </section>

        {/* Gráfico com dropdown de filtro */}
        <section className="section-wrapper">
          <h2>Estoque por Produto</h2>

          {/* Dropdown minimalista */}
          <div style={{ marginBottom: "1rem", position: "relative" }}>
            <button
              onClick={() => setDropdownAberto(!dropdownAberto)}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#1f3b8c",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
              }}
            >
              {categoriaSelecionada} ▾
            </button>
            {dropdownAberto && (
              <ul
                style={{
                  position: "absolute",
                  backgroundColor: "white",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  borderRadius: "0.5rem",
                  padding: 0,
                  marginTop: "0.5rem",
                  listStyle: "none",
                  zIndex: 10,
                }}
              >
                {categorias.map((cat) => (
                  <li
                    key={cat}
                    onClick={() => {
                      setCategoriaSelecionada(cat);
                      setDropdownAberto(false);
                    }}
                    style={{
                      padding: "0.75rem 1rem",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div style={{ width: "100%", height: 500 }}>
            <ResponsiveContainer>
              <BarChart data={dadosFiltrados}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="nome"
                  angle={-45}
                  textAnchor="end"
                  height={120}
                  tick={{ fontSize: 10, wordWrap: "break-word", width: 100 }}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantidade" fill="#1f3b8c" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="section-wrapper">
          <h2>Vendas por Produto</h2>
          <div style={{ width: "100%", height: 500 }}>
            <ResponsiveContainer>
              <LineChart
                data={dadosGrafico}
                margin={{ top: 20, right: 30, left: 20, bottom: 120 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="nome"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={120}
                  tick={{ fontSize: 10 }}
                />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="quantidade"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 6, fill: "#8884d8" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </div>
  );
}
