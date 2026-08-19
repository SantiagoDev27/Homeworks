console.clear();
console.log("==========================================");
console.log("      MÉTODOS DE ARRAYS EN JS       ");
console.log("==========================================");

// ==========================================
// 1. MUTABLES (Modifican el array original)
// ==========================================
console.group("1. Métodos Mutables (Agregan, eliminan o cambian)");

var frutas = ["Manzana", "Pera"];
console.log("Array original:", frutas);

frutas.push("Uva");
console.log(".push('Uva') -> Añade al final:", frutas);

frutas.pop();
console.log(".pop() -> Elimina el último:", frutas);

frutas.unshift("Mango");
console.log(".unshift('Mango') -> Añade al inicio:", frutas);

frutas.shift();
console.log(".shift() -> Elimina el primero:", frutas);

frutas.splice(1, 0, "Kiwi");
console.log(".splice(1, 0, 'Kiwi') -> Inserta en índice 1:", frutas);

frutas.sort();
console.log(".sort() -> Ordena alfabéticamente:", frutas);

frutas.reverse();
console.log(".reverse() -> Invierte el orden:", frutas);

console.groupEnd();

// ==========================================
// 2. ITERACIÓN Y TRANSFORMACIÓN
// ==========================================
console.group("2. Transformación e Iteración");

const numeros = [1, 2, 3, 4];

console.log(".map() -> Multiplica cada número por 2:");
console.table(numeros.map(n => ({ Original: n, Doble: n * 2 })));

console.log(".filter() -> Filtra solo los pares:");
console.log(numeros.filter(n => n % 2 === 0));

console.log(".reduce() -> Suma todos los elementos:");
console.log(numeros.reduce((acumulador, actual) => acumulador + actual, 0));

console.log(".forEach() -> Recorre el array:");
numeros.forEach((n, i) => console.log(`  Índice ${i}: ${n}`));

console.groupEnd();

// ==========================================
// 3. BÚSQUEDA Y VERIFICACIÓN
// ==========================================
console.group("3. Búsqueda y Verificación");

const edades = [15, 20, 25, 30];

console.log(".includes(20) -> ¿Existe el número 20?:", edades.includes(20));
console.log(".indexOf(25) -> Índice del número 25:", edades.indexOf(25));
console.log(".find(e => e > 18) -> Primer mayor de 18:", edades.find(e => e > 18));
console.log(".findIndex(e => e > 18) -> Índice del primer mayor de 18:", edades.findIndex(e => e > 18));
console.log(".some(e => e > 40) -> ¿Al menos uno es mayor a 40?:", edades.some(e => e > 40));
console.log(".every(e => e > 10) -> ¿Todos son mayores a 10?:", edades.every(e => e > 10));

console.groupEnd();

// ==========================================
// 4. CREACIÓN DE NUEVOS ARRAYS (Inmutables)
// ==========================================
console.group("4. Combinación y Extracción");

const a = [1, 2];
const b = [3, 4];

console.log(".concat() -> Une dos arrays:");
console.log(a.concat(b));

console.log(".slice(1, 3) -> Extrae una porción (índice 1 al 2):");
console.log([10, 20, 30, 40].slice(1, 3));

console.log(".join(' - ') -> Convierte a string con separador:");
console.log(["Hola", "Mundo"].join(" - "));

console.groupEnd();

// ==========================================
// 5. MÉTODOS MODERNOS (ES2023 - No mutan el original)
// ==========================================
console.group("5. Nuevos Métodos Inmutables (ES2023)");

const desordenado = [3, 1, 2];

console.log("Array base:", desordenado);
console.log(".toSorted() -> Ordena en un NUEVO array:", desordenado.toSorted());
console.log(".toReversed() -> Invierte en un NUEVO array:", desordenado.toReversed());
console.log(".with(1, 99) -> Reemplaza el índice 1 en un NUEVO array:", desordenado.with(1, 99));
console.log("El array base sigue intacto:", desordenado);

console.groupEnd();
console.log("==========================================");
