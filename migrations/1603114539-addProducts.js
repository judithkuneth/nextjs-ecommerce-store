const products = [
  {
    productId: '26',
    name: 'Burger Buns',
    price: 0.87,
  },
  {
    productId: '436',
    name: 'Krapfen',
    price: 1.2,
  },
  {
    productId: '5',
    name: 'Apfel-Rhabarber Kuchen',
    price: 55,
  },
  {
    productId: '301',
    name: 'Hausbrot',
    price: 3.6,
  },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO products ${sql(products, 'productId', 'name', 'price')}
`;
};

exports.down = async (sql) => {
  for (const product in products) {
    await sql`
      DELETE FROM products WHERE
        name = ${product.name};`;
  }
};
