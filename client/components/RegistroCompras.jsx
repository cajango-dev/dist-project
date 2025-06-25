import React, { useState } from 'react';
import {
  Package,
  ArrowDown,
  ArrowUp,
  Users,
  Truck,
  Menu,
  Warehouse,
  Layout,
  ShoppingBag,
} from 'lucide-react';
import './RegistroCompras.css';

export default function RegistroCompras({ onChangePage }) {
  const [purchases, setPurchases] = useState([]);
  const [formData, setFormData] = useState({
    clientName: '',
    beverage: '',
    quantity: '',
    date: '',
    value: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.clientName && formData.beverage && formData.quantity && formData.date && formData.value) {
      setPurchases([...purchases, { ...formData, id: Date.now() }]);
      setFormData({ clientName: '', beverage: '', quantity: '', date: '', value: '' });
    }
  };

  const handleDelete = (id) => {
    setPurchases(purchases.filter((purchase) => purchase.id !== id));
  };

  return (
    <div className="home-container">
      <aside className="sidebar">
        <div className="sidebar-title">
          <Menu /> Estoque Bebidas
        </div>
        <nav className="sidebar-nav">
          <button className="active" onClick={() => onChangePage("compras")}><ShoppingBag /> Compras</button>
          <button onClick={() => onChangePage("gestaoProdutos")}><Package /> Produtos</button>
          <button onClick={() => onChangePage("estoque")}><Warehouse /> Estoque</button>
          <button onClick={() => onChangePage("entradas")}><ArrowDown /> Entradas</button>
          <button onClick={() => onChangePage("saidas")}><ArrowUp /> Saida</button>
          <button onClick={() => onChangePage("mesas")}><Layout /> Mesas</button>
          <button onClick={() => onChangePage("clientes")}><Users /> Clientes</button>
          <button onClick={() => onChangePage("fornecedores")}><Truck /> Fornecedores</button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="section-wrapper header">
          <h1>Registro de Compras</h1>
          <div>
            <span onClick={() => onChangePage("home")} style={{ cursor: "pointer" }}>Início</span>
            <span>Compras</span>
          </div>
        </header>

        <section className="section-wrapper">
          <div className="card">
            <h2 className="text-black">Adicionar Nova Compra</h2>
            <form onSubmit={handleSubmit} className="purchase-form">
              <div className="form-group">
                <label>Nome do Cliente</label>
                <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Bebida</label>
                <input type="text" name="beverage" value={formData.beverage} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Quantidade</label>
                <input type="number" name="quantity" min="1" value={formData.quantity} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Data</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Valor (R$)</label>
                <input type="number" name="value" step="0.01" min="0" value={formData.value} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary">Registrar Compra</button>
            </form>
          </div>
        </section>

        <section className="section-wrapper">
          <h2 className="text-black">Histórico de Compras</h2>
          {purchases.length > 0 ? (
            <div className="card">
              <table className="purchases-table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Bebida</th>
                    <th>Quantidade</th>
                    <th>Data</th>
                    <th>Valor (R$)</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((purchase) => (
                    <tr key={purchase.id}>
                      <td>{purchase.clientName}</td>
                      <td>{purchase.beverage}</td>
                      <td>{purchase.quantity}</td>
                      <td>{purchase.date}</td>
                      <td>{parseFloat(purchase.value).toFixed(2)}</td>
                      <td>
                        <button className="btn btn-delete" onClick={() => handleDelete(purchase.id)}>Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="card">Nenhuma compra registrada.</p>
          )}
        </section>
      </main>
    </div>
  );
}