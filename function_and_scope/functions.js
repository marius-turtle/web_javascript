// How could we use the knowledge about function-scopes to prevent the naming-collision here?

var myVariable = "Foo"

// ... a lot of code

// ****** new code implemented
var myVariable = "Bar"
console.log(myVariable);
// ****** 

// ... a lot of code

console.log(myVariable)

// possible solution ***************

var myVariable = "Foo"

// ... a lot of code

function secureVariableScope() {
    var myVariable = "Bar"
    console.log(myVariable);
}
secureVariableScope();

// ... a lot of code

console.log(myVariable);

// possible solution

