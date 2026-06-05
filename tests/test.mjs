import test from "node:test";
import assert from "node:assert/strict";

function createLocalStorageMock() {
    let store = {};

    return {
        getItem(key) {
            return Object.prototype.hasOwnProperty.call(store, key)
                ? store[key]
                : null;
        },
        setItem(key, value) {
            store[key] = String(value);
        },
        removeItem(key) {
            delete store[key];
        },
        clear() {
            store = {};
        }
    };
}

globalThis.localStorage = createLocalStorageMock();

const { default: Cart } = await import("../constructors/Cart.js");
const { default: Product } = await import("../constructors/Product.js");

test("addProduct adds a product", () => {
    localStorage.clear();

    const cart = new Cart();
    const product = new Product(1, "Phone", 10, "Electronics");

    cart.addProduct(product);

    assert.equal(cart.getAllProducts().length, 1);
    assert.equal(cart.totalItems, 1);
    assert.equal(cart.getAllProducts()[0].product.id, 1);
});

test("removeProduct removes a product", () => {
    localStorage.clear();

    const cart = new Cart();
    const product = new Product(1, "Phone", 10, "Electronics");

    cart.addProduct(product);
    cart.removeProduct(1);

    assert.equal(cart.getAllProducts().length, 0);
    assert.equal(cart.totalItems, 0);
});

test("updateProductQuantity increases quantity", () => {
    localStorage.clear();

    const cart = new Cart();
    const product = new Product(1, "Phone", 10, "Electronics");

    cart.addProduct(product);
    cart.updateProductQuantity(1, 1);

    assert.equal(cart.getAllProducts()[0].quantity, 2);
    assert.equal(cart.totalItems, 2);
});

test("calculateTotal returns correct sum", () => {
    localStorage.clear();

    const cart = new Cart();
    const product1 = new Product(1, "Phone", 10, "Electronics");
    const product2 = new Product(2, "Mouse", 20, "Accessories");

    cart.addProduct(product1, 2);
    cart.addProduct(product2, 1);

    assert.equal(cart.calculateTotal(), 40);
});

test("clear empties cart", () => {
    localStorage.clear();

    const cart = new Cart();
    const product = new Product(1, "Phone", 10, "Electronics");

    cart.addProduct(product);
    cart.clear();

    assert.equal(cart.getAllProducts().length, 0);
    assert.equal(cart.totalItems, 0);
    assert.equal(cart.calculateTotal(), 0);
});