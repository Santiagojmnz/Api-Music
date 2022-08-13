module.exports = {
    add: (num1, num2) => {
        if(isNaN(num1) || isNaN(num2)){
            throw new Error("Valores inválidos")
        }
        return num1 + num2;
    },
    sustract: (num1, num2) => {
        if(isNaN(num1) || isNaN(num2)){
            throw new Error("Valores inválidos")
        }
        return num1 - num2;
    },
    multiply: (num1, num2) => {
        if(isNaN(num1) || isNaN(num2)){
            throw new Error("Valores inválidos")
        }
        return num1 * num2;
    },
    division: (diviend, divisor) => {
        if(isNaN(diviend) || isNaN(divisor)){
            throw new Error("Valores inválidos")
        }
        if(divisor === 0){
            throw new Error("División por cero")
        }
        
        return diviend / divisor;
    },
    sumArray: (values) => {
        let sum = 0;
        values.forEach(val => {
            if(isNaN(val)){
                throw new Error("Valores inválidos")
            }else{
                sum+=val;
            }
            
        });
        
        return sum;
    }
}