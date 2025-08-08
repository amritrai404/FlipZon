import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';    // apna mongoose model
import connectDB from './config/db.js';        // db connection

dotenv.config();

const products = [
  {
    title: 'Macbook Air',
    description: '15-inch Retina display for more of what you love in a slim design.',
    price: 99999, // ₹999.99 (price in cents)
    image: 'https://assets.stickpng.com/thumbs/5ec26e0b6c295800046c81db.png',
    category: 'electronics',
  },
  {
    title: 'PS4 Controller',
    description: 'Powerful Controller that redefine your gaming experience.',
    price: 4999, // ₹49.99
    image: 'https://assets.stickpng.com/thumbs/58f36427a4fa116215a923cf.png',
    category: 'electronics',
  },
  {
    title: 'Sony Headphones',
    description: 'Immersive audio experience with powerful computation.',
    price: 8999, // ₹89.99
    image: 'https://assets.stickpng.com/thumbs/580b57fbd9996e24bc43bfbe.png',
    category: 'electronics',
  },
  {
    title: 'Apple Iphone 12',
    description: '15-inch Retina display (128GB Storage, Purple)',
    price: 69999, // ₹699.99
    image: 'https://assets.stickpng.com/thumbs/61d2f93392b57c0004c64747.png',
    category: 'smartphones',
  },
  // Naye 4 products aapke diye hue images ke sath
  {
    title: 'Smartwatch',
    description: 'Advanced smartwatch with health tracking features.',
    price: 9999,  // ₹99.99
    image: 'https://i.postimg.cc/2jWJ5j2r/smartwatch.jpg',
    category: 'electronics',
  },
  {
    title: 'Vivo Smartphone',
    description: 'Latest Vivo smartphone with powerful performance.',
    price: 15999,  // ₹159.99
    image: 'https://i.postimg.cc/HsZQDXXx/vivo.jpg',
    category: 'smartphones',
  },
  {
    title: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with long battery life.',
    price: 1299,  // ₹12.99
    image: 'https://i.postimg.cc/1RMFwwWH/mouse.png',
    category: 'accessories',
  },
  {
    title: 'Sony Pendrive',
    description: 'High-speed Sony USB pendrive for data storage.',
    price: 799,  // ₹7.99
    image: 'https://i.postimg.cc/6Qs4t039/sony-pendrive.jpg',
    category: 'storage',
  },
];

const seedProducts = async () => {
  try {
    await connectDB();

    // Pehle sab products delete karo
    await Product.deleteMany();

    // Fir sab naye products add karo
    await Product.insertMany(products);

    console.log('✅ Products seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seedProducts();
