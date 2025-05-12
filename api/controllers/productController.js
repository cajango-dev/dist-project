// controllers/productController.js

// let products = []; 
// let nextId = 1;

let nextId = 21;

let products = [
  { id: 1, nome: 'Cerveja Heineken 600ml', descricao: 'Garrafa de vidro', preco: 7.5, estoque: 120, categoria: 'Bebidas Alcoólicas' },
  { id: 2, nome: 'Refrigerante Coca-Cola 2L', descricao: 'Pet', preco: 6.0, estoque: 80, categoria: 'Refrigerantes' },
  { id: 3, nome: 'Água Mineral sem Gás 500ml', descricao: 'Garrafa plástica', preco: 2.0, estoque: 150, categoria: 'Águas' },
  { id: 4, nome: 'Cerveja Skol Lata 350ml', descricao: 'Lata', preco: 3.5, estoque: 200, categoria: 'Bebidas Alcoólicas' },
  { id: 5, nome: 'Whisky Johnnie Walker Red Label 1L', descricao: 'Garrafa', preco: 89.9, estoque: 20, categoria: 'Bebidas Alcoólicas' },
  { id: 6, nome: 'Vodka Smirnoff 998ml', descricao: 'Garrafa', preco: 29.9, estoque: 35, categoria: 'Bebidas Alcoólicas' },
  { id: 7, nome: 'Suco de Laranja Natural One 900ml', descricao: 'Garrafa', preco: 9.0, estoque: 60, categoria: 'Sucos' },
  { id: 8, nome: 'Energético Red Bull 250ml', descricao: 'Lata', preco: 8.5, estoque: 50, categoria: 'Energéticos' },
  { id: 9, nome: 'Cerveja Brahma Chopp 1L', descricao: 'Garrafa', preco: 6.8, estoque: 75, categoria: 'Bebidas Alcoólicas' },
  { id: 10, nome: 'Guaraná Antarctica 350ml', descricao: 'Lata', preco: 3.0, estoque: 100, categoria: 'Refrigerantes' },
  { id: 11, nome: 'Espumante Chandon Brut 750ml', descricao: 'Garrafa', preco: 69.9, estoque: 15, categoria: 'Bebidas Alcoólicas' },
  { id: 12, nome: 'Vinho Chileno Gato Negro 750ml', descricao: 'Tinto seco', preco: 35.0, estoque: 25, categoria: 'Vinhos' },
  { id: 13, nome: 'Água Tônica Schweppes 350ml', descricao: 'Lata', preco: 3.5, estoque: 45, categoria: 'Águas' },
  { id: 14, nome: 'Cerveja Corona Extra 330ml', descricao: 'Garrafa Long Neck', preco: 6.0, estoque: 30, categoria: 'Bebidas Alcoólicas' },
  { id: 15, nome: 'Refrigerante Pepsi Twist 2L', descricao: 'Pet', preco: 5.5, estoque: 65, categoria: 'Refrigerantes' },
  { id: 16, nome: 'Catuaba Selvagem 1L', descricao: 'Vinho doce', preco: 12.0, estoque: 40, categoria: 'Vinhos' },
  { id: 17, nome: 'Ice Smirnoff Sabor Limão 275ml', descricao: 'Garrafa', preco: 6.0, estoque: 28, categoria: 'Bebidas Alcoólicas' },
  { id: 18, nome: 'Gin Tanqueray 750ml', descricao: 'Garrafa', preco: 119.9, estoque: 10, categoria: 'Bebidas Alcoólicas' },
  { id: 19, nome: 'Cerveja Stella Artois 550ml', descricao: 'Garrafa', preco: 7.0, estoque: 55, categoria: 'Bebidas Alcoólicas' },
  { id: 20, nome: 'Refrigerante Sprite 600ml', descricao: 'Pet', preco: 4.5, estoque: 90, categoria: 'Refrigerantes' }
];

exports.createProduct = (req, res) => {
    const newProduct = {
        id: nextId++,
        ...req.body
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
};

exports.getProducts = (req, res) => {
    res.json(products);
};

exports.getProductById = (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
};

exports.updateProduct = (req, res) => {
    const index = products.findIndex(p => p.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Product not found' });
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
};

exports.deleteProduct = (req, res) => {
    const index = products.findIndex(p => p.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Product not found' });
    products.splice(index, 1);
    res.json({ message: 'Product deleted' });
};
