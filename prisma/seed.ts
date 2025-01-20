import { prisma } from "./prisma-client";

export const _categories = [
  {
    title: "Пиццы",
  },
  {
    title: "Закуски",
  },
  {
    title: "Напитки",
  },
];

export const _ingredients = [
  {
    name: "Сырный бортик",
    price: 179,
    img: "https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png",
  },
  {
    name: "Сливочная моцарелла",
    price: 79,
    img: "https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png",
  },
  {
    name: "Сыры чеддер и пармезан",
    price: 79,
    img: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796",
  },
  {
    name: "Острый перец халапеньо",
    price: 59,
    img: "https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png",
  },
  {
    name: "Нежный цыпленок",
    price: 79,
    img: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A",
  },
  {
    name: "Шампиньоны",
    price: 59,
    img: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324",
  },
  {
    name: "Ветчина",
    price: 79,
    img: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61",
  },
  {
    name: "Пикантная пепперони",
    price: 79,
    img: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3",
  },
  {
    name: "Острая чоризо",
    price: 79,
    img: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027",
  },
  {
    name: "Маринованные огурчики",
    price: 59,
    img: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B",
  },
  {
    name: "Свежие томаты",
    price: 59,
    img: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67",
  },
  {
    name: "Красный лук",
    price: 59,
    img: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C",
  },
  {
    name: "Сочные ананасы",
    price: 59,
    img: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0",
  },
  {
    name: "Итальянские травы",
    price: 39,
    img: "https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png",
  },
  {
    name: "Сладкий перец",
    price: 59,
    img: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B",
  },
  {
    name: "Кубики брынзы",
    price: 79,
    img: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349",
  },
  {
    name: "Митболы",
    price: 79,
    img: "https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png",
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const _products = [
  {
    title: "Вода",
    desc: "0.5 л",
    img: "https://media.dodostatic.net/image/r:584x584/11eee20b3f64a6b8a0418ff967c69f72.avif",
    categoryId: 3,
  },
  {
    title: "Добрый Лимон-Лайм",
    desc: "0.5 л",
    img: "https://media.dodostatic.net/image/r:584x584/11ee7d61bab86255a811feea677ad674.avif",
    categoryId: 3,
  },
  {
    title: "Добрый Кола",
    desc: "0.5 л",
    img: "https://media.dodostatic.net/image/r:584x584/11ee7d61823be0d3a35b4abf658fd06b.avif",
    categoryId: 3,
  },
  {
    title: "Добрый апельсин",
    desc: "0.5 л",
    img: "https://media.dodostatic.net/image/r:584x584/11ee7d61aae50a4cb880d842915c82dc.aviff",
    categoryId: 3,
  },
  {
    title: "Куриные кусочки",
    desc: "Сочные кусочки цельного куриного филе с золотистой корочкой",
    img: "https://media.dodostatic.net/image/r:584x584/11ee7d61b9521d369d61228456c8f6c9.avif",
    categoryId: 2,
  },
  {
    title: "Картофель фри",
    desc: "Запеченная в печи картошечка — привычный вкус и мало масла. В составе пряные специи",
    img: "https://media.dodostatic.net/image/r:584x584/11eed646b7ac9c38ba256320dd31c4d5.avif",
    categoryId: 2,
  },
  {
    title: "Наггетсы",
    desc: "Нежное куриное мясо в хрустящей панировке",
    img: "https://media.dodostatic.net/image/r:584x584/11eef45eacc4d7eabc10e0a0e0c2c67a.avif",
    categoryId: 2,
  },
];

export const _pizzas = [
  {
    title: "Пепперони",
    desc: "Пикантная пепперони, увеличенная порция моцареллы, фирменный томатный соус",
    img: "https://media.dodostatic.net/image/r:292x292/11ee7d610a62d78598406363a9a8ad65.jpg",
  },
  {
    title: "Сырная",
    desc: "Моцарелла, сыры чеддер и пармезан, фирменный соус альфредо",
    img: "https://media.dodostatic.net/image/r:292x292/11ee7d610d2925109ab2e1c92cc5383c.jpg",
  },
  {
    title: "Ветчина и сыр",
    desc: "Ветчина, моцарелла и фирменный соус альфредо",
    img: "https://media.dodostatic.net/image/r:292x292/11ee7d60fda22358ac33c6a44eb093a2.jpg",
  },
  {
    title: "Пицца-бургер",
    desc: "Отличный вариант для любителей бургеров :3",
    img: "https://media.dodostatic.net/image/r:292x292/11ee7d61698827ee9b8db6d0aec53410.jpg",
  },
  {
    title: "Овощи и грибы",
    desc: "Много овощей и очень очень много грибов",
    img: "https://media.dodostatic.net/image/r:292x292/11ee7d61546d8483a61a0bbaa7adcc78.jpg",
  },
  {
    title: "Цыплёнок барбекю",
    desc: "Цыпленок, бекон, соус барбекю, красный лук, моцарелла, фирменный томатный соус",
    img: "https://media.dodostatic.net/image/r:292x292/11ee7d6110059795842d40396bcf1e73.jpg",
  },
];

async function generateProductItems() {
  const pizzas = await prisma.products.findMany({
    where: {
      categoryId: 1, // Assuming categoryId 1 is for pizzas
    },
  });

  const sizes = [30, 35, 40];

  for (const pizza of pizzas) {
    for (const size of sizes) {
      const price = calculatePrice(size); // Calculate price based on size only
      await prisma.productItems.create({
        data: {
          productId: pizza.id,
          price: price,
          pizzaSize: size,
        },
      });
    }
  }
}

async function generateOtherProductItems() {
  const otherProducts = await prisma.products.findMany({
    where: {
      categoryId: {
        not: 1, // Exclude pizzas
      },
    },
  });

  for (const product of otherProducts) {
    await prisma.productItems.create({
      data: {
        productId: product.id,
        price: product.categoryId === 3 ? 99 : 199, // Example pricing logic
      },
    });
  }
}

function calculatePrice(size: number): number {
  // Generate a random base price between 349 and 499, ending with 9
  const basePrice = Math.floor(Math.random() * (499 - 349 + 1) + 349);
  let adjustedBasePrice = Math.floor(basePrice / 10) * 10 + 9;

  if (size === 35) adjustedBasePrice += 100;
  if (size === 40) adjustedBasePrice += 200;

  return adjustedBasePrice;
}

async function up() {
  await prisma.categories.createMany({
    data: _categories,
  });
  await prisma.ingredients.createMany({
    data: _ingredients,
  });
  await prisma.products.createMany({
    data: _products,
  });

  const pizza1 = await prisma.products.create({
    data: {
      title: "Пепперони",
      desc: "Пикантная пепперони, увеличенная порция моцареллы, фирменный томатный соус",
      img: "https://media.dodostatic.net/image/r:292x292/11ee7d610a62d78598406363a9a8ad65.jpg",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
    },
  });
  const pizza2 = await prisma.products.create({
    data: {
      title: "Сырная",
      desc: "Моцарелла, сыры чеддер и пармезан, фирменный соус альфредо",
      img: "https://media.dodostatic.net/image/r:292x292/11ee7d610d2925109ab2e1c92cc5383c.jpg",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
    },
  });
  const pizza3 = await prisma.products.create({
    data: {
      title: "Ветчина и сыр",
      desc: "Ветчина, моцарелла и фирменный соус альфредо",
      img: "https://media.dodostatic.net/image/r:292x292/11ee7d60fda22358ac33c6a44eb093a2.jpg",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 15),
      },
    },
  });
  const pizza4 = await prisma.products.create({
    data: {
      title: "Пицца-бургер",
      desc: "Отличный вариант для любителей бургеров :3",
      img: "https://media.dodostatic.net/image/r:292x292/11ee7d61698827ee9b8db6d0aec53410.jpg",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
    },
  });
  const pizza5 = await prisma.products.create({
    data: {
      title: "Овощи и грибы",
      desc: "Много овощей и очень очень много грибов",
      img: "https://media.dodostatic.net/image/r:292x292/11ee7d61546d8483a61a0bbaa7adcc78.jpg",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
    },
  });
  const pizza6 = await prisma.products.create({
    data: {
      title: "Цыплёнок барбекю",
      desc: "Цыпленок, бекон, соус барбекю, красный лук, моцарелла, фирменный томатный соус",
      img: "https://media.dodostatic.net/image/r:292x292/11ee7d6110059795842d40396bcf1e73.jpg",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
    },
  });

  // Generate product items after creating pizzas
  await generateProductItems();
  await generateOtherProductItems();
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "Categories" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredients" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Products" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItems" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.log(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect;
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect;
    process.exit(1);
  });
