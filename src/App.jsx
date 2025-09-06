import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Navbar from "./components/Navbar";
import Cart from "./Pages/Cart";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataProvider } from "./context/DataContext";
import Footer from "./components/Footer";
import SingleProduct from "./Pages/SingleProduct";
import { useCart } from "./context/CartContext";
import CategoryProduct from "./Pages/CategoryProduct";
import ProtectedRoute from "./components/ProtectedRoute";

// ✅ ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // instantly scroll to top on route change
  }, [pathname]);

  return null;
}

function App() {
  const [location, setLocation] = useState();
  const { cartItem } = useCart(); // ✅ only read from context now

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

      try {
        const location = await axios.get(url);
        const exactLocation = location.data.address;
        setLocation(exactLocation);
        console.log(exactLocation);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <DataProvider>
      <BrowserRouter>
        <ScrollToTop />

        <Navbar location={location} getLocation={getLocation} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/category/:category" element={<CategoryProduct />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/cart"
            element={<ProtectedRoute>
              <Cart location={location} getLocation={getLocation} />
            </ProtectedRoute>}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
