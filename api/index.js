const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/Transaction.js');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.get('/api/test', (req, res) => {
    res.json('testo2k');
});
app.post('/api/transaction', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const {price , name, description, datetime} = req.body;
   
    const transaction = await Transaction.create({
       price,
       name,
       description,
       datetime 
    });
    res.json(transaction);
});

app.get('/api/transactions', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

