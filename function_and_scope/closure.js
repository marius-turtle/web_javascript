//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
//simple-closure example
function init() {
  var name = "Mozilla"; // name is a local variable created by init
  function displayName() { // displayName() is the inner function, a closure
    alert(name); // use variable declared in the parent function
  }
  displayName();
}
init();


// USE-CASE: object data privacy
var safeBuilder = function (treasure) {

  var secretPassword = 1984;

  var safeMethods = {
    useSafePassword: function usePassword(password) {
      return password == secretPassword ? treasure : 'Naaay, wrong password!';
    }
  }

  return safeMethods;
}