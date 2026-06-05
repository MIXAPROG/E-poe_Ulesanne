import test from "node:test";
import assert from "node:assert";
import Product from "../constructors/Product.js";

test("Product constructor creates product", () => {
    const product = new Product(
        1,
        "Phone",
        100,
        "Electronics"
    );

    assert.strictEqual(product.id, 1);
    assert.strictEqual(product.title, "Phone");
    assert.strictEqual(product.price, 100);
});