const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let products = [
  { id: 1, name: 'samsung', price: 100 },
  { id: 2, name: 'nokia', price: 200 },
  { id: 3, name: 'iphone', price: 300 },
];

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Delete selected products
app.post('/products/delete', (req, res) => {
  const idsToDelete = req.body.ids;
  products = products.filter(product => !idsToDelete.includes(product.id));
  res.json({ success: true, products });
});

// Update a product (name or price)
app.post('/products/update', (req, res) => {
  const { id, name, price } = req.body;
  products = products.map(product =>
    product.id === id ? { ...product, name, price } : product
  );
  res.json({ success: true, products });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
