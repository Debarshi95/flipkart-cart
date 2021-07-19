import React from 'react';
import { Box, Button, Typography, IconButton } from '@material-ui/core';
import { AddOutlined, RemoveOutlined } from '@material-ui/icons';

function Cart() {
  const [cartItems, setCartItems] = React.useState(JSON.parse(localStorage.getItem('cart')));

  const removeItemFromCart = (item) => {
    const filtered = cartItems.items.filter((cartItem) => cartItem.id !== item.id);
    setCartItems({
      items: filtered,
    });
    localStorage.setItem('cart', JSON.stringify({ items: [...filtered] }));
  };

  const increaseItemCount = (item) => {
    const updatedItems = cartItems.items.map((_item) => {
      if (_item.id === item.id) {
        return {
          ...item,
          count: _item.count + 1,
        };
      }
      return _item;
    });
    const updatedItemObj = { items: [...updatedItems] };
    localStorage.setItem('cart', JSON.stringify(updatedItemObj));
    setCartItems(updatedItemObj);
  };

  const decreaseItemCount = (item) => {
    const updatedItems = cartItems.items.map((_item) => {
      if (_item.id === item.id) {
        if (_item.count < 1) {
          return {
            ...item,
            count: 0,
          };
        }
        return {
          ...item,
          count: _item.count - 1,
        };
      }
      return _item;
    });
    const updatedItemObj = { items: [...updatedItems] };
    localStorage.setItem('cart', JSON.stringify(updatedItemObj));
    setCartItems(updatedItemObj);
  };

  const totalPrice = () => {
    return cartItems?.items.reduce((acc, current) => {
      // eslint-disable-next-line no-param-reassign
      acc += current.count * current.price;
      return acc;
    }, 0);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Box width="65%" margin="3rem 0" bgcolor="#fff" padding="2rem 4rem">
        <Typography variant="h4" style={{ fontFamily: 'inherit', margin: '0 0 3rem 0' }}>
          My Cart
        </Typography>
        {cartItems?.items.map((cartItem) => (
          <Box display="flex" flexDirection="column" key={cartItem.id} margin="1.2rem 0">
            <div style={{ height: 240, display: 'flex' }}>
              <div>
                <img
                  src={cartItem.imgUrl}
                  alt={cartItem.name}
                  style={{ height: '80%', objectFit: 'contain' }}
                />
                <Box display="flex">
                  <IconButton onClick={() => decreaseItemCount(cartItem)}>
                    <RemoveOutlined />
                  </IconButton>
                  <h5>{cartItem.count}</h5>
                  <IconButton onClick={() => increaseItemCount(cartItem)}>
                    <AddOutlined />
                  </IconButton>
                </Box>
              </div>
              <div style={{ marginLeft: 40 }}>
                <Typography variant="h5" style={{ fontFamily: 'inherit' }}>
                  {cartItem.name}
                </Typography>
                <Typography
                  component="div"
                  variant="h6"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                  }}
                >
                  Size :{' '}
                  {cartItem.size.map((s, i) => (
                    <p key={i}> {s},</p>
                  ))}
                </Typography>
                <Typography variant="h6">Price : Rs. {cartItem.price}</Typography>
                <Box display="flex" margin="2rem 0">
                  <Button variant="outlined" onClick={() => removeItemFromCart(cartItem)}>
                    Remove
                  </Button>
                  <Button variant="outlined">Save for later</Button>
                </Box>
              </div>
            </div>
          </Box>
        ))}
      </Box>

      <Box bgcolor="#fff" margin="3rem 0" padding="2rem 4rem">
        <Typography variant="h5" style={{ fontFamily: 'inherit', margin: '0 0 3rem 0' }}>
          Price Details
        </Typography>

        <Typography variant="h6" style={{ fontFamily: 'inherit', margin: '0 0 3rem 0' }}>
          Price ({cartItems?.items.length} items) Rs. {totalPrice()}
        </Typography>
        <Button variant="contained" disableElevation width="100%">
          Place Order
        </Button>
        <Typography variant="h6" style={{ fontFamily: 'inherit', margin: '0 0 3rem 0' }}>
          {/* Total Price (Rs. {totalPrice()}) */}
        </Typography>
      </Box>
    </div>
  );
}

export default Cart;
