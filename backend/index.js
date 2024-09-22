const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config(); // Load environment variables from .env

console.log("MongoDB URL after loading:", process.env.MONGODB_URL);

const app = express();

app.use(express.json());
app.use(cors());
console.log("prosee", process.env.MONGODB_URL)
app.get('/',(req,res)=>{
    res.send("Welcome to Listing Product Backend")
})

console.log("prosee", process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})


  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

app.use('/api', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
