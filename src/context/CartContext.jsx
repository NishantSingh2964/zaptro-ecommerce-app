import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(() => {
    // ✅ Load from localStorage on first render
    const storedCart = localStorage.getItem("cartItem");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // ✅ Save to localStorage whenever cartItem changes
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }, [cartItem]);

  const addToCart = (product) => {
    const itemInCart = cartItem.find((item) => item.id === product.id);
    if (itemInCart) {
      const updatedCart = cartItem.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItem(updatedCart);
      toast.info("Product is already in your cart"); // blue bar
    } else {
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
      toast.success("Product is added to cart"); // green bar
    }
  };

  const updateQuantity = (productId, action) => {
    setCartItem((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            let newUnit = item.quantity;
            if (action === "increase") {
              newUnit++;
              return { ...item, quantity: newUnit };
            } else if (action === "decrease") {
              newUnit--;
              return newUnit > 0 ? { ...item, quantity: newUnit } : null;
            }
          }
          return item;
        })
        .filter((item) => item != null)
    );

    if (action === "increase") {
      toast.success("Quantity is increased");
    } else if (action === "decrease") {
      toast.warning("Quantity is decreased");
    }
  };


  const deleteItem = (productId) => {
    setCartItem((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.error("Item is deleted from cart");
  };

  return (
    <CartContext.Provider
      value={{ cartItem, setCartItem, addToCart, updateQuantity, deleteItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
