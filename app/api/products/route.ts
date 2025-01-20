import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { stringify } from "json-bigint";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");
  let products;
  if (query) {
    products = await prisma.products.findMany({
      where: {
        title: {
          contains: query as string,
          mode: "insensitive",
        },
      },
    });
  } else {
    products = await prisma.products.findMany();
  }
  const jsonString = stringify(products);
  return NextResponse.json(JSON.parse(jsonString));
}
