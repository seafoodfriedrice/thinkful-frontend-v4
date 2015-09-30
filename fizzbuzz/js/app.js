function fizzBuzz(max) {
  for (var i = 1; i <= max; i++) {
    if (i % 5 == 0 && i % 3 == 0) {
      console.log("FizzBuzz");
    } else if ( i % 3 == 0 ) {
      console.log("Fizz");
    } else if (i % 5 == 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}

var max;
var is_number = false;

while (is_number != true) {
  max = parseInt(prompt("Input a number: "));
  if (Number.isInteger(max)) {
    is_number = true;
  } else {
    alert("That is not a number. Try again.");
  }
}

fizzBuzz(max);
