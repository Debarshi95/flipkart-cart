import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import React from "react";

function Home() {
  const [products, setProducts] = React.useState(null);
  const [cartItem, setCartItems] = React.useState(
    JSON.parse(localStorage.getItem("cart")) || { items: [] }
  );

  React.useEffect(() => {
    fetch("/assets/data.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.log(err));
  }, []);

  const addItemToCart = (item) => {
    const oldItem = cartItem.items?.find((_item) => _item.id === item.id);
    if (oldItem) {
      const filteredArr = cartItem.items.filter((i) => i.id !== item.id);
      setCartItems((prev) => {
        let duplicateObj = {
          ...prev,
          items: [...filteredArr, { ...oldItem, count: ++oldItem.count }],
        };
        localStorage.setItem("cart", JSON.stringify(duplicateObj));
        return duplicateObj;
      });
    } else {
      setCartItems((prev) => {
        let duplicateObj = {
          ...prev,
          items: [...prev.items, { ...item, count: 1 }],
        };
        localStorage.setItem("cart", JSON.stringify(duplicateObj));
        return duplicateObj;
      });
    }
  };
  return (
    <Box
      flexWrap="wrap"
      display="flex"
      width="80%"
      margin="2.5rem auto"
      justifyContent="space-between"
    >
      {products?.map((product) => (
        <Card
          style={{
            width: 300,
            height: 500,
            margin: 8,
          }}
          elevation={0}
          key={product.id}
        >
          <CardMedia
            image={product.imgUrl}
            style={{
              width: "100%",
              height: "80%",
            }}
          />
          <CardContent>
            <Typography> {product.name} </Typography>
            <Box display="flex">
              <Button onClick={() => addItemToCart(product)}>
                Add to Cart
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default Home;
