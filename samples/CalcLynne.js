//ejemplo de funciones de calculadora
module.exports = {
    add: (num1, num2) => {
        if (isNaN(num1) || isNaN(num2)) {
            throw new Error("Valores inválidos")
        }
        return num1 + num2;
    },
    sustraction: (num1, num2) => {
        if (isNaN(num1) || isNaN(num2)) {
            throw new Error("Valores inválidos")
        }
        return num1 - num2; 
    },
    multiplication: (num1, num2) => {
        if (isNaN(num1) || isNaN(num2)) {
            throw new Error("Valores inválidos")
        }
        return num1 * num2; 
    },
    division: (num1, num2) => {
        if (isNaN(num1) || isNaN(num2)) {
            throw new Error("Valores inválidos")
        }
        if (num2 === 0) {
            throw new Error("División por cero") 
        }
        return num1 / num2; 
    },
    sumArray: (values) => {
        var sum=0;
       for(var i of values) {
            if (isNaN(i)) {
                throw new Error("Valores inválidos") 
            }
            sum+=i; 
        }
            return sum; 
        
    },
};
