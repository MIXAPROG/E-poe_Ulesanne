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

const { default: Customer } = await import("../constructors/Customer.js");

test("toggleFavorites adds and removes product", () => {
    localStorage.clear();

    const customer = new Customer("Mike");
    const product = {
        id: 1,
        title: "Phone",
        price: 10,
        category: "Electronics"
    };

    customer.toggleFavorites(product);

    assert.equal(customer.isFavorite(product), true);
    assert.equal(customer.getAllFavorites().length, 1);

    customer.toggleFavorites(product);

    assert.equal(customer.isFavorite(product), false);
    assert.equal(customer.getAllFavorites().length, 0);
});