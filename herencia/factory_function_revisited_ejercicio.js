/**
 * range.js: A class representing a range of values.
 * This is a factory function that returns a new range object.
 *
 * JavaScript. the Definitive Guide. David Flanagan.
 */


// inherit() returns a newly created object that inherits properties from the
// prototype object p.  It uses the ECMAScript 5 function Object.create() if
// it is defined, and otherwise falls back to an older technique.
function inherit(p) {
    if (p == null) throw TypeError(); // p must be a non-null object
    if (Object.create)                // If Object.create() is defined...
        return Object.create(p);      //    then just use it.
    var t = typeof p;                 // Otherwise do some more type checking
    if (t !== "object" && t !== "function") throw TypeError();
    // F en mayuscula para indicar que se invoca con new
    function F() {};                  // Define a dummy constructor function.
    F.prototype = p;                  // Set its prototype property to p.
    return new F();                   // Use f() to create an "heir" of p.
}


function range(from, to) {
    // Use the inherit() function to create an object that inherits from the
    // prototype object defined below. The prototype object is stored as
    // a property of this function, and defines the shared methods (behavior)
    // for all range objects.
    var r = inherit(range.methods); // lo crea con Object.create()

    // Store the start and end points (state) of this new range object.
    // These are noninherited properties that are unique to this object.
    r.from = from;
    r.to = to;

    // Finally return the new object
    return r;
}


// This prototype object defines methods inherited by all range objects.
range.methods = {
    // Return true if x is in the range, false otherwise
    // This method works for textual and Date ranges as well as numeric.
    includes: function(x) { return this.from <= x && x <= this.to; },
    // Invoke f once for each integer in the range.
    // This method works only for numeric ranges.
    // Pasamos la funcion a aplicar a cada elemnto como argumento
    foreach: function(f) {
        for(var x = Math.ceil(this.from); x <= this.to; x++) f(x);
    },
    // Return a string representation of the range
    toString: function() { return "(" + this.from + "..." + this.to + ")"; }
};


// Here are example uses of a range object.
var r = range(1,3);      // Create a range object mediante Object.create()
r.includes(2);           // => true: 2 is in the range
r.foreach(console.log);  // Prints 1 2 3
console.log(r.toString());          // Prints (1...3)

// instanceOf y isPrototypeOf permiten chequear si
// el prototipo especificado esta en la cadena de herencia
// pero no sirven para obtener la clase del objeto
console.log("r no es instancia de range: ", r instanceof range);                    // false, no usamos new, sino create
console.log("range.methods es prototipo de r: " + range.methods.isPrototypeOf(r));        // true
console.log("Object es prototipo de r: " + Object.prototype.isPrototypeOf(r));     // true

console.log(r.constructor.toString());


// Para acceder al atributo class de un objeto: de manera indirecta con toString
// instanceOf funciona de facto como el operador para obtener la clase de un objeto

/**
 * Objects created through object literals or by Object.create
 * have a class attribute of “Object”. If you define your own
 * constructor function, any objects you create with it
 * will have a class attribute of “Object”:
 * there is no way to specify the class attribute for your own classes of objects
 */
console.log("r tiene atributo: " + Object.prototype.toString.call(r).slice(8, -1));


/**
 * Delegate prototype, segun carnero
 */

var s = Object.create(r);       // que he hecho?
var t = Object.create(r);       // que he hecho?

// las siguientes evaluaciones por qué son true / false?
console.log("range.methods es prototipo de s" + range.methods.isPrototypeOf(s));
console.log("y de t: " + range.methods.isPrototypeOf(t));
console.log("r es prototipo de s: ", r.isPrototypeOf(s));

// que implica este codigo?
range.methods.action = function() {
    return "accion en range.methods";
};

// las siguientes evaluaciones por qué son true / false?
console.log("r hereda action de range.methods: " + r.action());
console.log("s hereda action de range.methods: " + s.action());

// que valor se muestra en consola: el de step en r o en s?
r.step = "integer";
console.log("JS encuentra step en la cadena: " + s.step);

// que sucede en la propiedad del prototipo?
s.step = "decimal";
console.log("step en s es " + s.step);
console.log("step en r es " + r.step);

// que valor se muestra en consola: el de description en r o en s?
r.description = {
    // creo una propiedad mutable (objeto literal) en r
    // como es un literal no puedo usar encapsulacion - this
    values: "from " + r.from + " to " + r.to,
    step: r.step,
};
console.log(s.description.values + " en " + s.description.step);

// muto el objeto description de r en s
// ha mutado en r?
s.description.step = s.step;
console.log("step en s: " + s.description.step);
console.log("step en r ya no es integer: " + r.description.step);

// y ahora?
s.description = "en numeros romanos";
console.log("description en s apunta a un nuevo objeto: " + r.description.step);
