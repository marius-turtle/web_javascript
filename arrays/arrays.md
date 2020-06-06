Those will be a reference for the exercises, which can be found in `array.js`.

# Creating Arrays
## Using square-bracket-notation (Literal)
```javascript
let planets = ['Sun', 'Merkur', 'Venus', 'Earth'];
```

## Using the Constructor-Function
```javascript
let planets = new Array('Sun', 'Merkur', 'Venus', 'Earth');
```

# Operating on Arrays

The following methods will be linked to the latest ES-specification (living standard).

## [forEach()](https://tc39.es/ecma262/#sec-array.prototype.foreach)

```javascript
planets.forEach(function handlePlanet(planet, index, planets) {
  console.log('index: ', index);
  console.log('planet: ', planet);
  console.log('planets: ', planets);
});
```

You'll get no return value using forEach()

```javascript
let editedPlanetArray = planets.forEach(function handlePlanet(planet, index, planets) {
  // console.log(...); 
  // even if the passed function has a return statement
  return 'foo';
});

editedPlanetArray; // undefined
```

## [map()](https://tc39.es/ecma262/index.html#sec-array.prototype.map)
Works similar to `forEach`

```javascript
planets.map(function(planet, index, planets) {
  // console.log(...); 
});
```
The `map()`-method returns as value an array normally with the same size of the traversed array. BUT, we have to take a careful look at the passed function (in that case `processPlanet()`). If that function does not return something, the index in the new array will have no value respectively `undefined`.

```javascript
let editedPlanetArray = planets.map(function processPlanet(planet, index, planets) {
  // console.log(...); 
});

editedPlanetArray; // [undefined, undefined, undefined, undefined]

let editedPlanetArray = planets.map(function processPlanet(planet, index, planets) {
  // console.log(...); 
  return "Planet: " + planet;
});

editedPlanetArray; // ["Planet: Sun", "Planet: Merkur", "Planet: Venus", "Planet: Earth"]
```

## [sort()](https://tc39.es/ecma262/#sec-array.prototype.sort)


```javascript
let planets = ['Sun', 'Merkur', 'Venus', 'Earth'];

let planetsSorted = planets.sort();
```

> The time and space complexity of the sort cannot be guaranteed as it depends on the implementation.

Concerning the performance it depends on the implementation you provide, as stated by the [MDN webdocs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

## [filter()](https://tc39.es/ecma262/#sec-array.prototype.filter)

```javascript
let planets = ['Sun', 'Merkur', 'Venus', 'Earth'];

//ES6
let planetsWithE = planets.filter(planet => planet[0] === 'E');

//ES5
let planetsWithE = planets.filter(function filterPlanetsWithE(planet) {
    if (planet[0] === 'E') {
        return planet;
    }
});
```
For that function the new syntax with the lambda expression is a lot more compact than using a function-expression, but if there is a stacktrace you will get the following information, which might be sometimes enough, when we deal with small functions, where the syntax only might be used for.

```javascript
let planetsWithE = planets.filter(planet => {
    throw "DummyError"
    return planet[0] === 'E';
});

//Uncaught DummyError
//(anonymous) @ VM569:2
//(anonymous) @ VM569:1
```
But when it sometimes might come to more code the old syntax where it is possible to declare a function name might come in handy to get more information while debugging. 
```javascript
let planetsWithE = planets.filter(function filterPlanetsWithE(planet) {
    throw "DummyError"
    if (planet[0] === 'E') {
        return planet;
    }
});

//Uncaught DummyError
//filterPlanetsWithE @ VM610:2
//(anonymous) @ VM610:1
```

## [reduce()](https://tc39.es/ecma262/#sec-array.prototype.reduce)

```javascript
let planets = ['Sun', 'Merkur', 'Venus', 'Earth'];

let buildSolarSystemAcronym = function buildSolarSystemAcronym(acronymToBuild, currentValue, currentIndex){
    if(currentIndex === 1){
        return acronymToBuild[0]+'-'+currentValue[0];
    };
    return acronymToBuild+'-'+currentValue[0];
};

let incompleteSolarSystemAcronym = planets.reduce(buildSolarSystemAcronym);
```
Be careful here with the currentIndex, which will be `1` if you leave out the `initialValue`-parameter.

## [reverse()](https://tc39.es/ecma262/#sec-array.prototype.reverse)

```javascript
let planets = ['Sun', 'Merkur', 'Venus', 'Earth'];

let planetsReversed = planets.reverse();
```

# Pitfalls

## Automatic Argument-Passing ([Reference](https://livecodestream.dev/post/2020-06-03-stranger-things-javascript-edition/))

Assuming we have an array with integers represented as strings and we would like to create a new array where the integers are represented with the data-type `number`.

We can do that using the `Array.map()`-method. We just have to take care. Why? Since the example below is a very expressive form of passing a function as argument to the `map`-function, a lot of things are hidden.

```javascript
let numArray = ['1', '7', '11'].map(parseInt);
//expected > numArray = [1, 7, 11]
numArray //[1, NaN, 3]
```
Lifting the curtain we could see following:

```javascript
// ES5
let numArray = ['1', '7', '11'].map(function (index,value,array) {
    console.log('arguments: ', arguments)
    //arguments:  Arguments(3) ["1", 0, Array(3), callee: ƒ, Symbol(Symbol.iterator): ƒ]
    //arguments:  Arguments(3) ["7", 1, Array(3), callee: ƒ, Symbol(Symbol.iterator): ƒ]
    //arguments:  Arguments(3) ["11", 2, Array(3), callee: ƒ, Symbol(Symbol.iterator): ƒ]
    return parseInt(index,value,array);
});
// ES6
let numArray = ['1', '7', '11'].map((index,value,array) => {
    console.log('arguments: ', arguments) //ReferenceError, since `arguments`-prop only works with non-arrow-functions
    return parseInt(index,value,array);
});
```
`map()` hands over three arguments to the passed 'handler-function' (`parseInt()`), which will then unsolicitedly use those arguments as they come, even though it actually just excpects two arguments [`parseInt(string, radix)`](https://tc39.es/ecma262/#sec-parseint-string-radix). Passing more arguments does not matter, since the arguments get stored in an [`arguments`-property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) which is treated array-like and therefore can take as many values as there might come. The function `parseInt()` then (simply speaking) takes its `arguments`-property and uses the values at the first and second index for its process.

# Resources
* [ES-Spec (Living Standard)][1]
* [MDN][2] (most of the time you get direct reference to the spec a the bottom of one topic)
* [W3Schools][3]

[1]: https://tc39.es/ecma262/index.html#sec-array-objects
[2]: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array
[3]: https://www.w3schools.com/js/js_arrays.asp
