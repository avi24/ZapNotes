// creating our own custom module

const add = (a, b) => {
    return a + b;
}

const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    if (b = 0) return "Error: Division by zero is not allowed";
        
    return a / b;
}

module.exports = {
    add,
    subtract,
    multiply,
    divide
};