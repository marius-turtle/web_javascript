# Create a function

```javascript
function myFirstFunction(){
   console.log("Hello JavaScript!");
}
```

# Why to name functions?

Helpful for debugging and more verbose in the stacktrace

```javascript
function failureFunc(theObject) {
  const a = "first";
  a = "reassign won't work";
}
```

> Output:

```
VM128:3 Uncaught TypeError: Assignment to constant variable.
    at myFunc (<anonymous>:3:5)
    at <anonymous>:1:1
```