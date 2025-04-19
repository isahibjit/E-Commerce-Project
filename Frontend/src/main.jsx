import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CartProvider } from "./Contexts/CartContext.jsx";
import App from "./App.jsx";
import { UserProvider } from "./Contexts/UserContext.jsx";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { SearchProvider } from "./Contexts/SearchContext.jsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CartProvider>
          <SearchProvider>
          <App />
          </SearchProvider>
        </CartProvider>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>
);
