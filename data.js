/*
module.exports = function () {
    return {
        categories: ["Watersports", "Soccer", "Chess"],
        products: [
             { id: 1, name: "Kayak", category: "Watersports", 
                description: "A bot for one person", price: 275 },
            { id: 3, name: "Soccer Ball", category: "Soccer",
                description: "FIFA-approved size and weight", price: 19.50 },
            { id: 6, name: "Thinking Cap", category: "Chess", 
                description: "Improve brain efficiency by 75%", price: 16 },
            { id: 9, name: "Bling Bling King", category: "Chess",
                description: "Gold-plated, diamond-studded King", price: 12000 }
         ],
         orders: []
    }
}
*/
var faker = require("faker");
var categories = ["Watersports", "Soccer", "Chess", "Running"];
var products = []
function generateProductsData() {
    var data = [];

    faker.seed(100);
    for (let i = 1; i <= 503; i++) {
        var category = faker.helpers.randomize(categories);
        data.push({
            id: i,
            name: faker.commerce.productName(),
            category: category,
            description: `${category}: ${faker.lorem.sentence(3)}`,
            price: Number(faker.commerce.price())
        })
    }
    return data;
}

products = generateProductsData();

function generateOrdersData(products) {
    var orders = [];
    for (let i = 1; i<= 103; i++) {
        var fname = faker.name.firstName(); var sname = faker.name.lastName();
        var order = {
            id: i, name: `${fname} ${sname}`,
            email: faker.internet.email(fname, sname),
            address: faker.address.streetAddress(), city: faker.address.city(),
            zip: faker.address.zipCode(),
            country: faker.address.country(),
            shipped: faker.datatype.boolean(),
            products: []
        }
        var productCount = faker.datatype.number({ min: 1, max: 5});
        var product_ids = [];
        while (product_ids.length < productCount) {
            var candidateId = faker.datatype.number({ min: 1, max: products.length});
            if (product_ids.indexOf(candidateId) === -1) {
                product_ids.push(candidateId);
            }
        }

        for (let j = 0; j < productCount; j++) {
            order.products.push({
                quantity: faker.datatype.number({ min: 1, max: 10}),
                product_id: product_ids[j]
            })
        }
        orders.push(order)
    }
    return orders;
}

orders = generateOrdersData(products);

module.exports = function () {
    return {
        categories: categories,
        products: products,
        orders: orders
    }
}