module.exports = {
    add: (val1, val2) => {
        if (isNaN(val1) || isNaN(val2)) {
            throw new Error("Valores inválidos")
        }
        return val1 + val2;

    },
    subtrac: (val1, val2) => {
        if (isNaN(val1) || isNaN(val2)) {
            throw new Error("Valores inválidos")
        }

        return val1 - Math.abs(val2);
    },
    multiply: (val1, val2) => {
        if (isNaN(val1) || isNaN(val2)) {
            throw new Error("Valores inválidos")
        }

        return val1 * val2;
    },
    division: (val1, val2) => {
        if (isNaN(val1) || isNaN(val2)) {
            throw new Error("Valores inválidos")
        }
        if (val2 === 0) {
            throw new Error("División por cero")
        }

        return val1 / val2;

    },
    addArray: (array = []) => {
        var add = 0;
        array.forEach(element => {
            if (isNaN(element)) {
                throw new Error("Valores inválidos")
            }
            add += element;

        });
        return add;
    }


}