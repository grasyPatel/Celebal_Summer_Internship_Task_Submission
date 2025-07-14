import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import User from "./models/User.js";
import Cart from "./models/Cart.js";
import products from "./data/products.js";


dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

const seedData = async () => {
    try{
        await User.deleteMany();
        await Product.deleteMany();
        await Cart.deleteMany();



        const createdUsers = await User.create(
            {
                name:"Admin",
                email:"admin@gmail.com",
                password:"123456",
                role:"admin"
            }
        );
        const  userId = createdUsers._id;
        const sampleProduct=products.map((product)=>{
            return {...product,user:userId}
        });

        await Product.insertMany(sampleProduct);
        console.log("Data seeded successfully");
        process.exit()
        




    }
    catch(err){
        console.log(err);
        console.log("Error seeding data");
        process.exit(1);
    
    
    }
}

seedData();