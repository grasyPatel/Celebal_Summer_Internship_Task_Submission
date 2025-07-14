import express from "express";
import User from "../models/User.js";
import Product from "../models/Product.js";
import jwt from "jsonwebtoken";
import {protect, admin }from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/",protect, admin,async (req, res) => {
    try {
        const { name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished,  tags,  dimensions, weight , sku} = req.body;
        const product = new Product({name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished,  tags,  dimensions, weight , sku,user:req.user._id});
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);   
        res.status(500).json({ message: "Server Error" });


    }
});
//update
router.put("/:id", protect, admin, async (req, res) => {
    try{
        const { name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished,  tags,  dimensions, weight , sku} = req.body;

        const product= await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        product.name = name|| product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.discountPrice = discountPrice || product.discountPrice;
        product.countInStock = countInStock || product.countInStock;
        product.category = category || product.category;
        product.brand = brand || product.brand;
        product.sizes = sizes || product.sizes;
        product.colors = colors || product.colors;
        product.collections = collections || product.collections;
        product.material = material || product.material;
        product.gender = gender || product.gender;
        product.images = images || product.images;
        product.isFeatured = isFeatured!== undefined ? isFeatured : product.isFeatured;
        product.isPublished = isPublished!== undefined ? isPublished : product.isPublished;
        product.tags = tags || product.tags;
        product.dimensions = dimensions || product.dimensions;
        product.weight = weight || product.weight;
        product.sku = sku || product.sku;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }


});

//delete
router.delete("/:id", protect, admin, async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(product){
           await Product.deleteOne({ _id: product._id });
            res.json({message:"Product removed"});
        }
        else{
            res.status(404).json({message:"Product not found"});

        }

    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});

    }
});  


//get /api/products
//get product with querry filter
router.get("/", async (req, res) => {
  try {
    const {
      collections,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit
    } = req.query;

    // Build dynamic filter query
    let query = {};

    if (collections && collections.toLowerCase() !== "all") {
      query.collections = collections;
    }

    if (category && category.toLowerCase() !== "all") {
      query.category = category;
    }

    if (material) {
      query.material = {$in: material.split(",")};
    }

    if (brand) {
      query.brand = {$in: brand.split(",")};
    }

    if (gender ) {
      query.gender = gender;
    }

    if (size) {
      query.sizes = { $in: size.split(",") } // matches any product that includes this size
    }

    if (color) {
      query.colors = {$in: [color]};
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Sorting
    let sortOptions = {};

    switch (sortBy) {
      case "price":
        sortOptions.price = 1;
        break;
      case "price-desc":
        sortOptions.price = -1;
        break;
      case "popularity":
        sortOptions.rating = -1;
        break;
      case "newest":
        sortOptions.createdAt = -1;
        break;
      default:
        sortOptions.createdAt = -1;
    }

    const products = await Product.find(query)
      .sort(sortOptions)
      .limit(limit ? Number(limit) : 0); // default limit

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server Error" });
  }
});



  
  
//get /api/products/similar/:id
//get similar products
router.get("/similar/:id", async (req, res) => {
  console.log("get similar products",req.params.id)
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        const similarProducts = await Product.find({
          gender: product.gender,
          category: product.category,
          _id: { $ne: product._id },
        }).limit(4);
        res.json(similarProducts);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      console.log("Server Error in get similar products");
      res.status(500).json({ message: "Server Error" });
    }
})
//get api/products/best-seller
//get product with heighest rating
router.get("/best-seller", async (req, res) => {
  try {
    const bestSellers = await Product.find({}).sort({ rating: -1 }).limit(1);
    res.json(bestSellers);
    } catch (error) {
    console.log("Server Error in get best sellers");
    res.status(500).json({ message: "Server Error" });
  }
});


//get api/products/new-arrivals
//desc Retrive latest 8 product -creation date

router.get("/new-arrivals", async (req, res) => {
  try {
    const newArrivals = await Product.find({}).sort({ createdAt: -1 }).limit(8);
    res.json(newArrivals);
  } catch (error) {
    console.log("Server Error in get new arrivals");
    res.status(500).json({ message: "Server Error" });
  }
});


//get /api/products/:id.  Singgle Product by di

router.get("/:id", async (req, res) => {
  console.log("get single product",req.params.id)
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Server Error in get single product");
    res.status(500).json({ message: "Server Error" });
  }
});


    

export default router;