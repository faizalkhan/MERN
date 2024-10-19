const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const authRoutes = require('./routes/authRoutes');
const path = require('path');
 // Load environment variables from .env

const app = express();

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/',(req,res)=>{
    res.send("Welcome to Listing Product Backend")
})

require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000
})


  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

app.use('/api', productRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
