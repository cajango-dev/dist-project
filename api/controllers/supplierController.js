const Supplier = require('../models/Supplier'); 

let suppliers = [
  { _id: 1, nome: 'Fornecedor Alpha', cnpj: '12345678000199', status: 'Ativo' },
  { _id: 2, nome: 'Fornecedor Beta', cnpj: '98765432000199', status: 'Inativo' },
  { _id: 3, nome: 'Fornecedor Gama', cnpj: '11122334000199', status: 'Ativo' },
  { _id: 4, nome: 'Fornecedor Delta', cnpj: '22233445500199', status: 'Ativo' },
  { _id: 5, nome: 'Fornecedor Ômega', cnpj: '33445566778899', status: 'Inativo' },
  { _id: 6, nome: 'Fornecedor Sigma', cnpj: '44556677889900', status: 'Ativo' },
  { _id: 7, nome: 'Fornecedor Zeta', cnpj: '55667788990011', status: 'Ativo' },
  { _id: 8, nome: 'Fornecedor Kappa', cnpj: '66778899001122', status: 'Inativo' },
  { _id: 9, nome: 'Fornecedor Lambda', cnpj: '77889900112233', status: 'Ativo' },
  { _id: 10, nome: 'Fornecedor Iota', cnpj: '88990011223344', status: 'Inativo' },
  { _id: 11, nome: 'Fornecedor Epsilon', cnpj: '99001122334455', status: 'Ativo' },
  { _id: 12, nome: 'Fornecedor Pi', cnpj: '12345678901234', status: 'Inativo' },
  { _id: 13, nome: 'Fornecedor Theta', cnpj: '23456789012345', status: 'Ativo' },
  { _id: 14, nome: 'Fornecedor Rho', cnpj: '34567890123456', status: 'Inativo' },
  { _id: 15, nome: 'Fornecedor Tau', cnpj: '45678901234567', status: 'Ativo' },
  { _id: 16, nome: 'Fornecedor Phi', cnpj: '56789012345678', status: 'Inativo' },
  { _id: 17, nome: 'Fornecedor Chi', cnpj: '67890123456789', status: 'Ativo' },
  { _id: 18, nome: 'Fornecedor Psi', cnpj: '78901234567890', status: 'Ativo' },
  { _id: 19, nome: 'Fornecedor Xing', cnpj: '89012345678901', status: 'Inativo' },
  { _id: 20, nome: 'Fornecedor Zeta 2', cnpj: '90123456789012', status: 'Ativo' }
];

// Criar fornecedor
exports.createSupplier = (req, res) => {
  try {
    const { nome, cnpj, status } = req.body;
    
    if (!nome || !cnpj || !status) {
      return res.status(400).json({ message: 'Nome, CNPJ e Status são obrigatórios' });
    }

    // Gerar um novo ID baseado no último ID do array
    const newId = suppliers.length ? suppliers[suppliers.length - 1]._id + 1 : 1;

    const newSupplier = { _id: newId, nome, cnpj, status };
    suppliers.push(newSupplier);

    res.status(201).json(newSupplier); 
  } catch (error) {
    console.error('Erro ao criar fornecedor:', error);
    res.status(500).json({ message: 'Erro interno ao criar fornecedor', error });
  }
};

// Buscar todos os fornecedores
exports.getSuppliers = (req, res) => {
  try {
    res.status(200).json(suppliers); 
  } catch (error) {
    console.error('Erro ao buscar fornecedores:', error);
    res.status(500).json({ message: 'Erro interno ao buscar fornecedores', error });
  }
};

// Buscar fornecedor por ID
exports.getSupplierById = (req, res) => {
  try {
    const { id } = req.params;
    const supplier = suppliers.find(s => s._id === parseInt(id));

    if (!supplier) {
      return res.status(404).json({ message: 'Fornecedor não encontrado' });
    }

    res.status(200).json(supplier); 
  } catch (error) {
    console.error('Erro ao buscar fornecedor:', error);
    res.status(500).json({ message: 'Erro interno ao buscar fornecedor', error });
  }
};

// Atualizar fornecedor
exports.updateSupplier = (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cnpj, status } = req.body;

    const supplierIndex = suppliers.findIndex(s => s._id === parseInt(id));
    if (supplierIndex === -1) {
      return res.status(404).json({ message: 'Fornecedor não encontrado' });
    }

    const updatedSupplier = {
      ...suppliers[supplierIndex],
      nome: nome || suppliers[supplierIndex].nome,
      cnpj: cnpj || suppliers[supplierIndex].cnpj,
      status: status || suppliers[supplierIndex].status
    };

    suppliers[supplierIndex] = updatedSupplier;

    res.status(200).json(updatedSupplier);
  } catch (error) {
    console.error('Erro ao atualizar fornecedor:', error);
    res.status(500).json({ message: 'Erro interno ao atualizar fornecedor', error });
  }
};

// Deletar fornecedor
exports.deleteSupplier = (req, res) => {
  try {
    const { id } = req.params;
    const supplierIndex = suppliers.findIndex(s => s._id === parseInt(id));

    if (supplierIndex === -1) {
      return res.status(404).json({ message: 'Fornecedor não encontrado' });
    }

    suppliers.splice(supplierIndex, 1);

    res.status(200).json({ message: 'Fornecedor deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar fornecedor:', error);
    res.status(500).json({ message: 'Erro interno ao deletar fornecedor', error });
  }
};