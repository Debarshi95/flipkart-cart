import { Box, IconButton } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div
      style={{
        backgroundColor: '#2874f0',
        width: '100%',
        padding: '0.4rem 4rem',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Link to="/">
          <img src="/assets/images/flipkart-logo.png" style={{ height: 30 }} alt="" />
        </Link>
        <Link to="/cart" style={{ textUnderline: 'none' }}>
          <IconButton>Cart</IconButton>
        </Link>
      </Box>
    </div>
  );
}

export default Navbar;
