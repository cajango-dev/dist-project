const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reportRoutes = require('./routes/reportRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
app.use(express.json());

//mongoose.connect('mongodb://localhost:27017/erp_distribuidora', { useNewUrlParser: true, useUnifiedTopology: true })
//    .then(() => console.log('MongoDB connected'))
//    .catch(err => console.log(err));

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/orders', orderRoutes);
app.use('/reports', reportRoutes);
app.use('/payments', paymentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
