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
function generateData() {
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
module.exports = function () {
    return {
        categories: categories,
        products: generateData(),
        orders: []
    }
}