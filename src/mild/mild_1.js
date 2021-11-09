/**
 *
 * @param {number} a
 * @param {number} b
 * @returns {string} 'a + b = (a + b)'
 *
 * example: sumToString(3, 4)
 * returns: '3 + 4 = 7'
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */
export function sumToString(a, b) {
    var c = a + b;
    var message = `${a} + ${b} = ${c}`;
    return message;
}


/**
 *
 * @param {number} startNumber
 * @param {number} endNumber
 * @returns {number[]}
 *
 * example: getIncreasingArray(3, 7)
 * returns: [ 3, 4, 5, 6, 7 ]
 *
 */
export function getIncreasingArray(startNumber, endNumber) {
    let arr = [startNumber];
    for(let i = startNumber + 1; i < endNumber + 1; i++) {
        arr.push(i);
    }
    return arr;
}

/**
 *
 * @param {number[]} numbers
 * @return {{min: number, max: number}}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
 */
export function maxAndMin(numbers) {
    var min = numbers[0];
    var max = min;
    for (let i = 0; i < numbers.length; i++) {
        if(min > numbers[i]) {
            min = numbers[i];
        }
        if(max < numbers[i]) {
            max = numbers[i];
        }
    }
    let rv = new Object();
    rv.max = `${max}`;
    rv.min = `${min}`;
    return rv;

}

/**
 *
 * @param array - An array of any primitive type
 * @returns {object} Object where the keys are the values that were passed in
 * and the value was the number of times it occurred.
 *
 * example: countArray([3, 6, 3, 2, 2, 3, 'some', 'hello', 'some', [1, 2]])
 * returns: {'2': 2, '3': 3, '6': 1, some: 2, hello: 1, '1,2': 1}
 *
 */
export function countArray(array) {
    let rv = new Object();
    let copy = array.slice();
    var counter;
    var current;
    for(let i = 0; i < copy.length; i++) {
        current = copy[i];
        counter = 1;
        for(let j = i + 1; j < copy.length; j++) {
            if(copy[j] == current) {
                counter++;
                copy.splice(j, 1);
                j--;
            }
        }
        rv[current] = counter;
    }
    return rv;
}