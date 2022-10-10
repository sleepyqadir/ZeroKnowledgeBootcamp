from starkware.cairo.common.bitwise import bitwise_and, bitwise_xor
from starkware.cairo.common.cairo_builtins import BitwiseBuiltin, HashBuiltin
from starkware.cairo.common.math import unsigned_div_rem


// Implement a function that sums even numbers from the provided array
func sum_even{bitwise_ptr: BitwiseBuiltin*,range_check_ptr:felt}(arr_len: felt, arr: felt*, run: felt, idx: felt) -> (
    sum: felt
) {
    if(arr_len == 0){
        return (sum=0);
    }

    let (sum_of_rest) = sum_even(arr_len-1,arr,run+1,idx+1);
    let (quotient, remainder) = unsigned_div_rem(arr[run],2);

    if(remainder == 0) { 
        return (sum = sum_of_rest+ arr[run]);
    }
        return (sum=sum_of_rest);
}
