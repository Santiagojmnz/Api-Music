const assert = require('assert');
const { multiply } = require('../samples/Calc');
const calc = require('../samples/Calc');
//esenarios de pruebas
//bloque de pruebas
describe("Test calculadora", () => {
    before(() => {
        console.log("Probando")
    })
    after(() => {
        console.log('Fin test')
    })

    //Bloque de prueba
    describe('Funcion sumar', () => { //?Se definen bloques de pruebas
        //casos de prueba sumar
        it('Debe retornar 5 cuando: 3+2', () => { //?Caso de prueba o esenario
                assert.equal(calc.add(3, 2), 5) //?Se utiliza assert para llevar a cabo el esenario o prueba especificada
            }) //? Se ingresan los valores (primer valor, segundo valor) valor esperado
        it('Debe retornar 0 cuando: 0+0', () => {
            assert.equal(calc.add(0, 0), 0)
        })
        it('Debe retornar Error cuando:5+ "hola"; incluyendo la leyenda "Valores inválidos" ', () => {
            assert.throws(() => {
                calc.add(5, 'hola')
            }, {
                name: 'Error',
                message: 'Valores inválidos'
            })


        })
    })
    describe('Funcion restar', () => {
        //casos de prueba restar
        it('Debe retornar 2 cuando: 5-3', () => {
            assert.equal(calc.subtrac(5, 3), 2)
        })
        it('Debe retornar -10 cuando: 10,-20', () => {
            assert.equal(calc.subtrac(10, -20), -10)
        })
        it('Debe retornar Error cuando:"abc" -8; incluyendo la leyenda "Valores inválidos" ', () => {
            assert.throws(() => {
                calc.subtrac('abc', -8)
            }, {
                name: 'Error',
                message: 'Valores inválidos'
            })


        })
    })
    describe('Funcion Multiplicar', () => {
        //casos de prueba multiplicar
        it('Debe retornar 15 cuando: 5*3', () => {
            assert.equal(calc.multiply(5, 3), 15)
        })
        it('Debe retornar 0 cuando 0*0', () => {
            assert.equal(calc.multiply(0, 0), 0)
        })
        it('Debe retornar Error cuando: 8*"bgh"; incluyendo la leyenda "Valores inválidos" ', () => {
            assert.throws(() => {
                calc.multiply(8, 'bgh')
            }, {
                name: 'Error',
                message: 'Valores inválidos'
            })


        })
    })
    describe('Funcion Dividir', () => {
        //casos de prueba multiplicar
        it('Debe retornar 5 cuando: 15/3', () => {
            assert.equal(calc.division(15, 3), 5)
        })
        it('Debe retornar 0 cuando 0/50', () => {
            assert.equal(calc.division(0, 50), 0)
        })
        it('Debe retornar Error cuando: 50/0; incluyendo la leyenda "División por cero" ', () => {
            assert.throws(() => {
                calc.division(50, 0)
            }, {
                name: 'Error',
                message: 'División por cero'
            })


        })
        it('Debe retornar Error cuando: "efg"/0; incluyendo la leyenda "Valores inválidos" ', () => {
            assert.throws(() => { //
                calc.division('efg', 0)
            }, {
                name: 'Error',
                message: 'Valores inválidos'
            })


        })
    })
    describe('Sumar Array', () => {

        it('Debe retornar 21 cuando: [1,2,3,4,5,6]', () => {
            assert.equal(calc.addArray([1, 2, 3, 4, 5, 6]), 21)
        })
        it('Debe retornar Error cuando: [2,6,1,"hola"]; incluyendo la leyenda "Valores inválidos" ', () => {
            assert.throws(() => {
                calc.addArray([2, 6, 1, 'hola'])
            }, {
                name: 'Error',
                message: 'Valores inválidos'
            })


        })
    })
})