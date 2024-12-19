import express from "express";
import mongoose from "mongoose";
import Product from "./models/product.model.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes



app.get("/", (req, res) => {
  res.send("Hello From Node API and Nodemon added");
});

// Get/View Query
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get/View single data using its ID Query
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Add a Query in Node Express
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch {
    res.status(500).json({ message: error.message });
  }
});

//Update/Edit Query in Node Express
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete Product API in NOde Express
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    res.status(200).json({ message: "Product Deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://yugantkhadse2198:2RZZ0UVJQG655FxC@nodedb.vr4re.mongodb.net/Node-API?retryWrites=true&w=majority&appName=NodeDB"
  )
  .then(() => {
    console.log("Connected to Database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection Failed!");
  });
