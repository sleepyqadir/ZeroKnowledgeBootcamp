%lang starknet
from starkware.cairo.common.bitwise import bitwise_and, bitwise_xor
from starkware.cairo.common.cairo_builtins import BitwiseBuiltin
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.math import unsigned_div_rem

// Using binary operations return:
// - 1 when pattern of bits is 01010101 from LSB up to MSB 1, but accounts for trailing zeros
// - 0 otherwise

// 000000101010101 PASS
// 010101010101011 FAIL

func pattern{bitwise_ptr: BitwiseBuiltin*, range_check_ptr}(
    n: felt, idx: felt, exp: felt, broken_chain: felt
) -> (true: felt) {
   alloc_locals;
    let (local lsb) = bitwise_and(n,1);

    if (lsb == exp) {
        if (idx != 0) {
            return (true=0);
        }
    }

    if (n == 0) {
        return (true=1);
    } else {
        return pattern((n - lsb)/2, idx + 1, lsb, 0);
    }

}
