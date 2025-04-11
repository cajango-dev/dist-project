/* Estrutura inicial da pasta /api para o projeto de distribuidora de bebidas */

// /api/index.js
const express = require("express");
const router = express.Router();

// Importa rotas por domínio
const clientesRoutes = require("./clientes/routes");
const produtosRoutes = require("./produtos/routes");
const pedidosRoutes = require("./pedidos/routes");

// Aplica as rotas
router.use("/clientes", clientesRoutes);
router.use("/produtos", produtosRoutes);
router.use("/pedidos", pedidosRoutes);

module.exports = router;


// /api/clientes/routes.js
const express = require("express");
const Router = express.Router();
const controller = require("./controller");

router.get("/", controller.getAll);
router.post("/", controller.create);

module.exports = router;


// /api/clientes/controller.js
exports.getAll = (req, res) => {
    res.json({ message: "Listar todos os clientes" });
};

exports.create = (req, res) => {
    res.json({ message: "Criar um cliente" });
};


// /api/clientes/service.js
exports.listarClientes = async () => {
    // lógica para listar clientes
};

exports.criarCliente = async (dados) => {
    // lógica para criar cliente
};


// /api/clientes/model.js
// Exemplo com Sequelize ou Mongoose (placeholder)
// module.exports = (sequelize, DataTypes) => {
//   const Cliente = sequelize.define("Cliente", { ... });
//   return Cliente;
// };


// Estrutura semelhante pode ser replicada para /produtos e /pedidos


// /api/middlewares/errorHandler.js
module.exports = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message || "Erro interno do servidor." });
};


// /api/middlewares/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ error: "Token não fornecido." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido." });
    }
};


// Swagger Setup (/api/swagger.js)
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Distribuidora de Bebidas",
            version: "1.0.0",
        },
    },
    apis: ["./api/**/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
