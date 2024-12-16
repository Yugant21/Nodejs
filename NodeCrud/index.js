import express from 'express'
import mongoose from 'mongoose';
import Product from './models/product.model.js'

const app = express();
app.use(express.json());
// yugantkhadse2198
// 2RZZ0UVJQG655FxC
app.get('/', (req, res) => {
    res.send('Hello From Node API and Nodemon added');
})

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.post('/api/products', async (req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch {
        res.status(500).json({message: error.message});
    }
})

mongoose.connect('mongodb+srv://yugantkhadse2198:2RZZ0UVJQG655FxC@nodedb.vr4re.mongodb.net/Node-API?retryWrites=true&w=majority&appName=NodeDB')
.then(() => {
    console.log("Connected to Database!");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    })
})
.catch(() => {
    console.log("Connection Failed!");
    
})