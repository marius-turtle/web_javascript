# Create an object

With a literal

```javascript
var course = { name: "JavaScript", teacher: "Peter" };
```

Will create under the hood an object with three properties

- name
- teacher

The third property is:

`__proto__: Object`

## new in ES2015

```javascript
// Shorthand property names (ES2015)
let a = "foo",
  b = 42,
  c = {};
let o = { a, b, c };

// Shorthand method names (ES2015)
let o = {
  property(parameters) {},
};

// Computed property names (ES2015)
let prop = "foo";
let o = {
  [prop]: "hey",
  ["b" + "ar"]: "there",
};
```
