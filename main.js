import { displayAllProductsView } from "./views/allProductsView.js";
import { navigate, handleRoute } from "./router.js";
import { fetchProducts } from "./api.js";
import { cartConstructor } from "./constructors/Cart.js";

let products = [];

const updateCartCount = () => {
    document.getElementById("cart-count").textContent =
        cartConstructor.totalItems;
};

const initApp = async () => {
    products = await fetchProducts();

    document.getElementById("home-button").onclick = () =>
        navigate("allProducts", products);

    document.getElementById("favourites").onclick = () =>
        navigate("favorites");

    document.getElementById("cart-btn").onclick = () =>
        navigate("cart");

    window.addEventListener("hashchange", () => handleRoute(products));
    
    handleRoute(products);

    updateCartCount();
};

document.addEventListener("DOMContentLoaded", initApp);

