import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { TrackOrder } from "./pages/TrackOrder";
import { RefundPolicy } from "./pages/RefundPolicy";
import { ShippingPolicy } from "./pages/ShippingPolicy";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="track-order" element={<TrackOrder />} />
            <Route path="policies/refund-policy" element={<RefundPolicy />} />
            <Route path="policies/shipping-policy" element={<ShippingPolicy />} />
            <Route path="policies/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="policies/terms-of-service" element={<TermsOfService />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
