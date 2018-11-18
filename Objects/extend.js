/**
 * Añade un metodo nonenumerable extend() al objeto q.
 * Este metodo extiende al objeto q
 * copiando las propiedades del objeto p pasado como argumento.
 * Los atributos de las propiedades son copiados tambien,
 * no solo el valor de la propiedad.
 * Todas las own properties (incluso las no-enumerables)
 * del objeto pasado como argumento (p) son copiadas
 * excepto aquellas que tienen el mismo nombre en q.
 *
 * q.extend(Objeto) -> copia las propiedades de p en el objeto q
 * 1. copia propiedades de p que son propietarias
 * 2. copia el valor de los atributos
 *
 */


var q = {};

/**
 * q.extend(Objeto) -> copia las propiedades de p en el objeto q
 * 1. copia propiedades de p que son propietarias  excepto aquellas que tienen el mismo nombre en q
 * 2. copia el valor de los atributos
 * @param objeto
 * @returns {q}
 */
q.extend = function (objeto) {
    var propiedades = Object.getOwnPropertyNames(objeto)
    for (propiedad in propiedades) {
        if (!this.hasOwnProperty(propiedades[propiedad])) {
            Object.defineProperty(this, propiedades[propiedad], Object.getOwnPropertyDescriptor(p, propiedades[propiedad]));
        }
    }
    return this;
}

//Definimos la propiedad enumerable de la nueva función extend de q como false
// Para que no pueda salir en un bucle for (property in q) { ...
Object.defineProperty(q, "extend", {enumerable: false})

var p = Object.defineProperties({}, {
    x: {value: 1, writable: true, enumerable: true, configurable: true},
    y: {value: 1, writable: true, enumerable: true, configurable: true},
    // z no es enumerable
    z: {value: 1, writable: true, enumerable: false, configurable: true},
    r: {
        get: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        },
        enumerable: true,
        configurable: true
    }
});

// Inicializamos q
q.x = 2;
q.y = 2;

q.extend(p);

// un poco de testing fulero
console.log("x no se ha copiado en q: " + q.x);
console.log("y no se ha copiado en q: " + q.y);
console.log("z se ha copiado en q: " + q.z);

// extend, z no son enumerables
for (property in q) {
    console.log(property);
}

// Returns {value: 2, writable:true, enumerable:true, configurable:true}
console.log(Object.getOwnPropertyDescriptor(p, "x"));

// Returns {value: 1, writable:true, enumerable:false, configurable:true}
console.log(Object.getOwnPropertyDescriptor(p, "z"));

// Returns {get, set:undefined, enumerable:true, configurable:true}
console.log(Object.getOwnPropertyDescriptor(p, "r"));