const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Distribuidora de Bebidas",
            version: "1.0.0",
            description: "API para gerenciamento de fornecedores, produtos, pedidos e relatórios financeiros de uma distribuidora de bebidas",
        },
        servers: [
            {
                url: "http://localhost:5000/api",
                description: "Servidor de desenvolvimento",
            },
        ],
        components: {
            schemas: {
                Pedido: {
                    type: "object",
                    required: ["cliente", "produtos", "data"],
                    properties: {
                        cliente: { type: "string", description: "Nome do cliente", example: "João da Silva" },
                        produtos: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    produto: { type: "string", format: "objectId", description: "ID do produto" },
                                    quantidade: { type: "integer", description: "Quantidade comprada", example: 2 },
                                },
                            },
                        },
                        total: { type: "number", format: "float", description: "Valor total da venda", example: 58.90 },
                        data: { type: "string", format: "date-time", description: "Data da venda" },
                    },
                },
            },
        },
    },
    apis: ["./routes/*.js"], // Inclui novas rotas 
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
