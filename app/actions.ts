"use server";

import { prisma } from "@/prisma/prisma-client";

export async function createOrder(data) {
  try {
    await prisma.orders.create({ data: data });
  } catch (err) {
    console.log(err);
  }
}

export async function getOrders(userId) {
  try {
    const orders = await prisma.orders.findMany({
      where: {
        userId: userId,
      },
    });
    return orders;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllOrders() {
  try {
    const orders = await prisma.orders.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
    return orders;
  } catch (error) {
    console.error(error);
  }
}
