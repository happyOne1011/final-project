import prisma from '../config/db.js';

export async function getAll(userId, role) {
   if (role === 'ADMIN') {
    return prisma.order.findMany({
      include: { items: false } // Optional: Includes the purchased items in the receipt
    });
  } 
  // If the user is a normal USER, return ONLY the orders matching their ID
  return prisma.order.findMany({
    where: { 
      userId: userId 
    },
    include: { items: false } 
  });
}

export async function getById(id) {
 const order = await prisma.order.findUnique({
    where: { id: id },
    include: {
      items: {
        include: {
          product: true // We need this to get the productName and price
        }
      }
    }
  });

  // 2. If no order exists, return null so the Service can throw a 404
  if (!order) {
    return null;
  }

  // 3. Format the data to perfectly match your Phase 1 JSON Design Document
  const formattedOrder = {
    id: order.id,
    userId: order.userId,
    totalAmount: Number(order.totalAmount), // Ensure decimals don't return as strings
    status: order.status,
    createdAt: order.createdAt,
    
    // Map over the Prisma items array and flatten the product details
    items: order.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      productName: item.product.name, // Grabbing name from joined product table
      quantity: item.quantity,
      price: Number(item.product.price)      // Grabbing price from joined product table
    }))
  };

  return formattedOrder;
}


export async function create(userId, ordersData) {
  const newOrder = await prisma.$transaction(async (tx) => { 
    
    let totalAmount = 0;
    const orderItemsData = [];
    for (const item of ordersData) {
      const product = await tx.product.findUnique({ 
        where: { id: item.productId } 
      });
      
      // Database-level validations
      if (!product) {
        throw { status: 404, message: `Product ${item.productId} not found` };
      }
      if (product.stock < item.quantity) {
        throw { status: 400, message: `Insufficient stock for product ${product.productName}` };
      }

      // Calculate total amount
      totalAmount += Number(product.price) * item.quantity;

      // Prep data for OrderItem table
      orderItemsData.push({ 
        productId: product.id, 
        quantity: item.quantity 
      });

      // Deduct stock from the Product table
      await tx.product.update({
        where: { id: product.id },
        data: { stock: { decrement: item.quantity } }
      });
    }

    // 2. Create Order AND OrderItems simultaneously
    return await tx.order.create({
      data: {
        userId: userId,
        totalAmount: totalAmount,
        status: "Pending", 
        items: {
          create: orderItemsData // Inserts into OrderItem table
        }
      },
    });
  });
  return newOrder;
}

export async function update(id, updatedData) {
  try {
    const updatedOrders= await prisma.order.update({
      where: { id },
      data: updatedData,
    });
    return updatedOrders;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    const deletedOrders = await prisma.order.delete({
      where: { id },
    });
    return deletedOrders;
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}



