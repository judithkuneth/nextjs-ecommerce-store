import cookie from 'js-cookie';

export function getCart() {
  const cart = cookie.getJSON('cart') || [];
  console.log('cookie.getJSON - getting Cookie', cart);
  return cart;
}

function parse(x, base) {
  const parsed = parseInt(x, base);
  if (isNaN(parsed)) {
    return 0;
  }
  return parsed;
}
export function removeFromCookie(id) {
  const cart = getCart();
  const parsedId = parse(id, 10);
  const newCart = cart.filter((item) => item.id !== parsedId);

  cookie.set('cart', newCart);
  console.log('removed item, updated cart', newCart);

  return newCart;
}

export function resetCookie(emptyCart) {
  cookie.set('cart', emptyCart);
}

export function addToCookie(id, count) {
  const cart = getCart();
  const parsedId = parse(id, 10);
  const check = cart.filter((item) => item.id === parsedId);
  console.log('id', id);
  console.log('filter for id', id, 'in cart', cart, '... Result:', check);

  function addItem(id, count) {
    console.log('add to cookie');
    const newCart = [...cart, { id: id, count: count }];

    cookie.set('cart', newCart);
    console.log('cookie.set: added item', newCart);

    return newCart;
  }

  function editItem(id, count) {
    console.log('edit cookie');
    const index = cart.findIndex((item) => id === item.id);

    const newCart = [...cart];
    newCart[index] = { ...newCart[index], count: count };

    cookie.set('cart', newCart);
    console.log('cookie.set: updated item.count', newCart);

    return newCart;
  }
  return check.length < 1
    ? addItem(parsedId, count)
    : editItem(parsedId, count);
}
