{/*
 Las funciones flechas fueron introducidas en ES6 y son una alternativa simple y corta de hacer funciones. Pero tiene sus diferencias

 FUNCION NORMAL
 function multiply(num1, num2) {
   const result = num1 * num2
   return result
 }

 FUNCION FLECHA
 const multiply = (num1, num2) => {
   const result = num1 * num2
   return result
 }

---------------
DIFERENCIAS
---------------
1. NO ARGUMENTOS
Las funciones normales tienen un constructor con su argumentos los cuales pueden ser accedidos, pero con una función flecha no. Esta no posee un objeto "argumento"
function print() {
  console.log(arguments)
}
print("hello", 400, false)

// {
//   '0': 'hello',
//   '1': 400,
//   '2': false
// }

2. Las funciones flecha no crean su propio enlace `this`
En una función normal tienes la variable "this" la cual es a los objetos que las invocan
const obj = {
  name: 'deeecode',
  age: 200,
  print: function() {
    console.log(this)
  }
}

obj.print()
// {
//   name: 'deeecode',
//   age: 200,
//   print: [Function: print]
// }

En las funciones flechas no se crea automaticamente una variable "this". Por lo tanto, cualquier referencia a esto se referiría a lo que era antes de que se creara la función.

3. Las funciones flechas no pueden usarse como constructor
Cuando creas un objeto vas a hacer un constructor, pero esto siempre se realizara con una función normal.
class Animal {
  constructor(name, numOfLegs) {
    this.name = name
    this.numOfLegs = numOfLegs
  }

  sayName() {
    console.log(`My name is ${this.name}`)
  }
}

const Dog = new Animal("Bingo", 4)
const Bird = new Animal("Steer", 2)

Dog.sayName()
// My name is Bingo

Bird.sayName()
// My name is Steer

Pero si intentas eso con una función flecha tendras un error. Esto es porque JS mira el constructor como un campo. Y en una clase no puedes tener un
campo llamado constructor.
class Animal {
  constructor = (name, numOfLegs) => {
    this.name = name
    this.numOfLegs = numOfLegs
  }

  sayName() {
    console.log(`My name is ${this.name}`)
  }
}

// Uncaught SyntaxError: Classes may not have a field named 'constructor'

4. LAS FUNCIONES FLECHAS NO PUEDEN SER DECLARADAS
Una declaracion de función involucra la palabra clave "función" y el nombre de la función.
Sin embargo, una función flecha no puede ser declarada, solo expresada porque son anonimas.

5. LAS FUNCIONES FLECHAS NO PUEDEN SER ACCESIDAS ANTES DE INICIARSE
En una función normal, puedes acceder a ella en cualquier parte del codigo. Esto es todo lo contrario
a una función flecha, primero debes crearla y ya luego podras usarla si no quieres tener un Reference Error:
ReferenceError: Cannot access 'printName' before initialization
  */}

console.log("------------")
console.log("COMPROBAR SI UN NUMERO ES PAR O NO")
console.log("------------")
const number = 19
console.log("numero: ", number)
console.log("------------")
console.log("Función normal")
function ParOInpar_FuncionNormal(number) {
  if (number % 2 == 0) {
    console.log("par")
  } else {console.log("impar")}
}
ParOInpar_FuncionNormal(number)
console.log("Función flecha")
const ParOInpar_FuncionFlecha = (number) => {
  if (number % 2 == 0) {
    console.log("par")
  } else {console.log("impar")}
}
ParOInpar_FuncionFlecha(number)
