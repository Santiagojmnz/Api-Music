let assert = require('assert');
const calc = require("../samples/calc_Luis");

describe("Calculadora", () => {
    before(() => { console.log("Probando funciones de calculadora"); })
    after(() => { console.log("Fin del test de calculadora"); })
});

describe("Sumar", () => {
    it("Debe retornar 5 cuando: 3 + 2", () => {
        assert.equal(calc.add(3, 2), 5);
    })
    it("Debe retornar 0 cuando: 0 + 0", () => {
        assert.equal(calc.add(0, 0), 0);
    })
    it("Debe retornar Error cuando: 5 + 'Hola'", () => {
        assert.throws(function () { calc.add(5, 'hola') },
            {
                name: 'Error',
                message: 'Valores inválidos'
            });
    })
});
describe("Restar", () => {
    it("Debe retornar 2 cuando: 5 - 3", () => {
        assert.equal(calc.sustract(5, 3), 2);
    })
    it("Debe retornar -10 cuando: 10 - 20", () => {
        assert.equal(calc.sustract(10, 20), -10);
    })
    it("Debe retornar Error cuando: 'abc' - 8", () => {
        assert.throws(function () { calc.sustract(5, 'hola') },
            {
                name: 'Error',
                message: 'Valores inválidos'
            });
    })
});
describe("Multiplicar", () => {
    it("Debe retornar 15 cuando: 5 * 3", () => {
        assert.equal(calc.multiply(5, 3), 15);
    })
    it(" Debe retornar 0 cuando: 0 * 0", () => {
        assert.equal(calc.multiply(0, 0), 0);
    })
    it("Debe retornar Error cuando: 8 * 'abc'", () => {
        assert.throws(function () { calc.multiply(8, 'abc') },
            {
                name: 'Error',
                message: 'Valores inválidos'
            });
    })
});
describe("Dividir", () => {
    it("Debe retornar 5 cuando: 15 / 3", () => {
        assert.equal(calc.division(15, 3), 5);
    })
    it("Debe retornar 0 cuando: 0 / 50", () => {
        assert.equal(calc.division(0, 50), 0);
    })
    it("Debe retornar Error cuando: 50 / 0; incluyendo la leyenda 'División por cero'", () => {
        assert.throws(function () { calc.division(50, 0) },
            {
                name: 'Error',
                message: 'División por cero'
            });
    })
    it("Debe retornar Error cuando: 'efg' / 0; incluyendo la leyenda 'Valores inválidos'", () => {
        assert.throws(function () { calc.division('efg', 0) },
            {
                name: 'Error',
                message: 'Valores inválidos'
            });
    })
});
describe("Sumar arreglo", () => {
    it("Debe retornar 21 cuando [1, 2, 3, 4, 5, 6]", () => {
        assert.equal(calc.sumArray([1, 2, 3, 4, 5, 6]), 21);
    })
    it("Debe retornar Error cuando [2, 6, 1, 'hola'], incluyendo la leyenda 'Valores inválidos'", () => {
        assert.throws(function () { calc.sumArray([2, 6, 1, 'hola']) },
            {
                name: 'Error',
                message: 'Valores inválidos'
            });
    })
});
