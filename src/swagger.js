// src/swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Distribuidora de Bebidas",
            version: "1.0.0",
            description:
                "API para gerenciamento de fornecedores e produtos de uma distribuidora de bebidas",
        },
        servers: [
            {
                url: "http://localhost:5000/api",
                description: "Servidor de desenvolvimento",
            },
        ],
        components: {
            schemas: {
                Fornecedor: {
                    type: "object",
                    required: ["nome", "cnpj", "endereco", "telefone", "email"],
                    properties: {
                        nome: {
                            type: "string",
                            description: "Nome completo do fornecedor",
                            example: "Bebidas S.A.",
                        },
                        cnpj: {
                            type: "string",
                            description: "CNPJ do fornecedor",
                            example: "12.345.678/0001-90",
                        },
                        endereco: {
                            type: "string",
                            description: "Endereço completo do fornecedor",
                            example: "Rua das Bebidas, 123, Centro, São Paulo - SP",
                        },
                        telefone: {
                            type: "string",
                            description: "Telefone para contato",
                            example: "(11) 98765-4321",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            description: "E-mail para contato",
                            example: "contato@bebidassa.com.br",
                        },
                        ativo: {
                            type: "boolean",
                            description: "Status do fornecedor (ativo/inativo)",
                            example: true,
                            default: true,
                        },
                    },
                },
                Produto: {
                    type: "object",
                    required: [
                        "nome",
                        "codigo",
                        "precoCompra",
                        "precoVenda",
                        "quantidadeEstoque",
                        "fornecedor",
                        "categoria",
                    ],
                    properties: {
                        nome: {
                            type: "string",
                            description: "Nome do produto",
                            example: "Cerveja Artesanal IPA",
                        },
                        codigo: {
                            type: "string",
                            description: "Código único do produto",
                            example: "CER-IPA-500ML",
                        },
                        descricao: {
                            type: "string",
                            description: "Descrição detalhada do produto",
                            example: "Cerveja artesanal tipo IPA com 500ml",
                        },
                        precoCompra: {
                            type: "number",
                            format: "float",
                            description: "Preço de compra do produto",
                            example: 8.5,
                        },
                        precoVenda: {
                            type: "number",
                            format: "float",
                            description: "Preço de venda do produto",
                            example: 12.9,
                        },
                        quantidadeEstoque: {
                            type: "integer",
                            description: "Quantidade disponível em estoque",
                            example: 150,
                            default: 0,
                        },
                        fornecedor: {
                            type: "string",
                            format: "objectId",
                            description: "ID do fornecedor do produto",
                            example: "615a1b23456789abcdef1234",
                        },
                        categoria: {
                            type: "string",
                            enum: ["Alcoólico", "Não Alcoólico", "Energético", "Outros"],
                            description: "Categoria do produto",
                            example: "Alcoólico",
                        },
                        ativo: {
                            type: "boolean",
                            description: "Status do produto (ativo/inativo)",
                            example: true,
                            default: true,
                        },
                    },
                },
                Error: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            description: "Mensagem de erro",
                            example: "Fornecedor não encontrado",
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.js"], // Caminho para os arquivos de rotas
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
