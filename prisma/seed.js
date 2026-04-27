import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
try {
  if (isDev) {
    await prisma.$queryRaw`TRUNCATE TABLE "OrderItem", "Order", "Product", "Category", "User" RESTART IDENTITY CASCADE;`;
    console.log('Development: e-commerce table truncated.');
  }
  // 1. Clear out all tables related to the E-commerce app
  

  const count = await prisma.user.count();

  if (count === 0) {
  // 2. Create 5 Users
  const usersData = [
    { email: 'alice@test.com', password: 'password123' },
    { email: 'bob@example.com', password: 'password123' },
    { email: 'charlie@demo.com', password: 'adminpassword', role: 'ADMIN' },
    { email: 'david@test.com', password: 'password123' },
    { email: 'eve@example.com', password: 'password123' },
  ];

  const users = [];
  for (const userData of usersData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        role: userData.role || 'USER',
      },
    });
    users.push(user);
  }
  console.log(`Created ${users.length} Users`);

  // 3. Create 5 Categories
  await prisma.category.createMany({
    data: [
      { name: 'Electronics' },
      { name: 'Clothing' },
      { name: 'Books' },
      { name: 'Home & Kitchen' },
      { name: 'Sports' },
    ]
  });

  const categories = await prisma.category.findMany();
  console.log(`Created ${categories.length} Categories`);

  // 4. Create 6 Products
  await prisma.product.createMany({
    data: [
      { name: 'Gaming Laptop', price: 1200.00, stock: 15, categoryId: categories[0].id },
      { name: 'Wireless Earphones', price: 25.99, stock: 50, categoryId: categories[0].id },  
      { name: 'Graphic T-Shirt', price: 18.50, stock: 100, categoryId: categories[1].id },
      { name: 'JavaScript Cookbook', price: 35.00, stock: 40, categoryId: categories[2].id },
      { name: 'Coffee Maker', price: 85.00, stock: 20, categoryId: categories[3].id },    
      { name: 'Yoga Mat', price: 22.00, stock: 60, categoryId: categories[4].id },        
    ]
  });

  const products = await prisma.product.findMany();
  console.log(`Created ${products.length} Products`);

  // 5. Create 5 Orders (One for each user)
  const laptop = products.find(p => p.name === 'Gaming Laptop');
  const Earphones = products.find(p => p.name === 'Wireless Earphones');

  let orderCount = 0; // Added a counter to track the actual number created

    for (const user of users) {
      // THE FIX: Skip user ID 1
      if (user.id === 1) {
        continue; 
      }

      await prisma.order.create({
        data: {
          userId: user.id,
          totalAmount: Number(laptop.price) + Number(Earphones.price), 
          status: 'Pending',
          items: {
            create: [
              { productId: laptop.id, quantity: 1 },
              { productId: Earphones.id, quantity: 1 },
            ],
          },
        },
      });
      orderCount++;
    }
    console.log(`Created ${orderCount} Orders (Skipped User ID 1)`);

  console.log('All Seed data completed successfully!');}
  else{
    console.log('Database already contains data. Skipping seed.');
  }
} catch (error) {
  console.error('Seed failed:', error);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}