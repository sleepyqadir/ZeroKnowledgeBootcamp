from starkware.cairo.common.math import unsigned_div_rem

// Perform and log output of simple arithmetic operations
func simple_math{range_check_ptr: felt}() {
   // adding 13 +  14

   let x = 13;

   %{ print(ids.x+14)%}

   // multiplying 3 * 6

   tempvar a = 3;
   tempvar b = a * 6;

   %{ print("a*b =", ids.b)%}

   // dividing 6 by 2

   tempvar divisor = 2;
   tempvar j = 6 / divisor;

   %{ print("6 /",ids.divisor,"=",ids.j)%}

   // dividing 70 by 2

   let value = 70;

   let (unsigned_quotient, remainder) = unsigned_div_rem(value, divisor);


   %{ print(ids.value,"/",ids.divisor,"=",ids.unsigned_quotient)%}

   // dividing 7 by 2


   let value = 7;

   let (unsigned_quotient, remainder) = unsigned_div_rem(value, divisor);


   %{ print(ids.value,"/",ids.divisor,"=",ids.unsigned_quotient)%}

    return ();
}
