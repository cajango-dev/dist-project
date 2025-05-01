# API - ERP Distribuidora de Bebidas

Back-end completo com CRUDs, relacionamentos automáticos e relatório atualizado automaticamente.

---

## CRUDS DISPONÍVEIS:

- Users
- Products
- Suppliers
- Orders
- Payments
- Reports (atualizado automaticamente)

---

## MODELOS:

- `/models/user.js`
- `/models/product.js`
- `/models/supplier.js`
- `/models/order.js`
- `/models/payment.js`
- `/models/report.js`

Todos usando Mongoose + MongoDB, com relacionamentos via ObjectId.

---

## CONTROLLERS:

- `/controllers/userController.js`
- `/controllers/productController.js`
- `/controllers/supplierController.js`
- `/controllers/orderController.js` (atualiza estoque e relatório ao criar pedido)
- `/controllers/paymentController.js`
- `/controllers/reportController.js`

---

## ROTAS:

| Rota          | Métodos                   |
|---------------|--------------------------|
| `/api/users`   | GET, POST, PUT, DELETE   |
| `/api/products`| GET, POST, PUT, DELETE   |
| `/api/suppliers`| GET, POST, PUT, DELETE  |
| `/api/orders`  | GET, POST, PUT, DELETE   |
| `/api/payments`| GET, POST, PUT, DELETE   |
| `/api/reports` | GET                      |

---

## RELATÓRIO AUTOMÁTICO:

✅ Atualizado ao criar um pedido:  
- Soma total de vendas
- Incrementa número de pedidos
- Atualiza quantidade vendida por produto

------
O código do Banco ta com o VINI,
acho que você vai ter que criar um /database na pasta api, ligar os CRUDS no banco, se quiser gerar dados 
ficticios, usa o mockaroo.com, bem tranquilo pra preencher dados.

