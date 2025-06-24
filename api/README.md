# API - ERP Distribuidora de Bebidas

Back-end completo com CRUDs, usando Supabase (PostgreSQL gerenciado) como banco de dados, com lógica de negócio separada em models, controllers e rotas. Relatórios atualizados automaticamente com dados consolidados.

---

## CRUDS DISPONÍVEIS:

- Users  
- Products  
- Suppliers  
- Orders  
- Payments  
- Clients  
- Stock (Estoque)  
- Tables (Mesas)  
- Reports (relatório consolidado)  

---

## MODELOS:

- `/models/user.js`  
- `/models/product.js`  
- `/models/supplier.js`  
- `/models/order.js`  
- `/models/payment.js`  
- `/models/client.js`  
- `/models/stock.js`  
- `/models/table.js`  
- `/models/report.js`  

Todos implementados com acesso direto ao Supabase via SDK oficial, utilizando queries SQL abstratas para CRUD e agregações.

---

## CONTROLLERS:

- `/controllers/userController.js`  
- `/controllers/productController.js`  
- `/controllers/supplierController.js`  
- `/controllers/orderController.js` (inclui lógica de atualização de estoque e relatórios)  
- `/controllers/paymentController.js`  
- `/controllers/clientController.js`  
- `/controllers/stockController.js`  
- `/controllers/tableController.js`  
- `/controllers/reportController.js`  

Controllers tratam requisições HTTP, validam dados e chamam os models, retornando respostas apropriadas.

---

## ROTAS:

| Rota            | Métodos                   | Descrição                       |  
|-----------------|---------------------------|---------------------------------|  
| `/users`        | GET, POST, PUT, DELETE    | Gerenciamento de usuários       |  
| `/products`     | GET, POST, PUT, DELETE    | Gerenciamento de produtos       |  
| `/suppliers`    | GET, POST, PUT, DELETE    | Gerenciamento de fornecedores   |  
| `/orders`       | GET, POST, PUT, DELETE    | Pedidos, atualização de estoque |  
| `/payments`     | GET, POST, PUT, DELETE    | Pagamentos                      |  
| `/clients`      | GET, POST, PUT, DELETE    | Gerenciamento de clientes       |  
| `/stock`        | GET, POST, DELETE         | Movimentações de estoque        |  
| `/tables`       | GET, POST, PUT, DELETE    | Gerenciamento de mesas          |  
| `/reports`      | GET                       | Relatório consolidado           |  

---

## RELATÓRIO AUTOMÁTICO:

✅ O relatório `/reports` é atualizado automaticamente ao criar ou alterar pedidos, incluindo:

- Soma total de vendas  
- Quantidade total de pedidos  
- Quantidade vendida por produto  

---

## CONFIGURAÇÃO E DADOS

- Banco de dados: Supabase (PostgreSQL)  
- Variáveis de ambiente necessárias:  
  - `SUPABASE_URL`  
  - `SUPABASE_ANON_KEY`  
